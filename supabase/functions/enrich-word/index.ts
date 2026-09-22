// Supabase Edge Function: enrich-word
// Follows standard Deno serve pattern

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { word } = await req.json();
    if (!word || typeof word !== 'string') {
      return new Response(JSON.stringify({ error: 'Word parameter is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const normalized = word.trim().toLowerCase();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

    // 1. Fetch from Free Dictionary API
    let dictData: any = null;
    try {
      const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(normalized)}`);
      if (dictRes.ok) {
        const json = await dictRes.json();
        if (Array.isArray(json) && json.length > 0) {
          dictData = json[0];
        }
      }
    } catch (_e) {
      console.warn('Dictionary API fetch error');
    }

    // 2. If Gemini API key is configured, enrich with LLM
    if (geminiApiKey) {
      const prompt = `Define and enrich the English word "${normalized}" in concise learner-friendly format.
Output ONLY raw JSON (no backticks):
{
  "word": "${normalized}",
  "simple_meaning": "clear simple sentence under 15 words",
  "detailed_meaning": "full explanation with nuances",
  "part_of_speech": "noun | verb | adjective | adverb | idiom",
  "example_sentence": "realistic natural example sentence",
  "synonyms": ["up to 4 synonyms"],
  "antonyms": ["up to 3 antonyms"],
  "pronunciation": "/IPA/",
  "phonetic": "easy phonetic spelling",
  "difficulty": "easy | medium | hard",
  "usage_context": "usage notes",
  "memory_tip": "clever mnemonic or memory aid"
}`;

      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
            }),
          }
        );

        if (geminiRes.ok) {
          const gJson = await geminiRes.json();
          const text = gJson?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            return new Response(JSON.stringify(parsed), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
        }
      } catch (err) {
        console.error('Gemini error:', err);
      }
    }

    // 3. Fallback to dictionary data if available
    if (dictData) {
      const meaning = dictData.meanings?.[0];
      const def = meaning?.definitions?.[0];
      const result = {
        word,
        normalized_word: normalized,
        simple_meaning: def?.definition || `Meaning for ${word}`,
        detailed_meaning: def?.definition || `Meaning for ${word}`,
        part_of_speech: meaning?.partOfSpeech || 'noun',
        example_sentence: def?.example || `He read about ${word} in an article.`,
        synonyms: meaning?.synonyms || [],
        antonyms: meaning?.antonyms || [],
        pronunciation: dictData.phonetic || `/${normalized}/`,
        phonetic: dictData.phonetic || normalized,
        difficulty: normalized.length > 8 ? 'hard' : 'medium',
        usage_context: 'General English usage.',
        memory_tip: `Practice using "${word}" in daily sentences.`,
      };
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Default fallback
    return new Response(
      JSON.stringify({
        word,
        normalized_word: normalized,
        simple_meaning: `The definition and concept of "${word}".`,
        part_of_speech: 'noun',
        example_sentence: `She expanded her vocabulary with "${word}".`,
        synonyms: [],
        antonyms: [],
        difficulty: 'medium',
        memory_tip: `Review "${word}" regularly to reinforce retention.`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
