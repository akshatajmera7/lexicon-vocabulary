import { normalizeWord } from '../../utils/wordNormalizer';
import { EnrichmentResult, IVocabularyProvider, ProviderOptions } from './types';

export class GeminiProvider implements IVocabularyProvider {
  name = 'Gemini AI';

  async enrichWord(word: string, options?: ProviderOptions): Promise<EnrichmentResult> {
    const apiKey = options?.geminiApiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key is not configured. Please add it in Settings.');
    }

    const normalized = normalizeWord(word);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const prompt = `You are an expert English vocabulary tutor and lexicographer.
Provide a rich, structured, learner-friendly JSON definition for the word or phrase "${normalized}".
Respond with ONLY a raw JSON object (no markdown code blocks, no backticks, no explanatory text).

JSON format:
{
  "word": "${normalized}",
  "simple_meaning": "A single clear, concise sentence (under 15 words) explaining the core meaning in plain English",
  "detailed_meaning": "A comprehensive explanation with nuances and depth",
  "part_of_speech": "noun | verb | adjective | adverb | idiom | phrase",
  "example_sentence": "A natural, memorable, modern sentence demonstrating real-world usage",
  "synonyms": ["up to 4 accurate synonyms"],
  "antonyms": ["up to 3 accurate antonyms"],
  "pronunciation": "/IPA pronunciation/",
  "phonetic": "easy phonetic spelling e.g. ih-FEM-er-uhl",
  "difficulty": "easy | medium | hard",
  "usage_context": "Where, when, and how this word is typically used in modern English",
  "memory_tip": "A clever mnemonic, visual image, or etymological connection to help remember it effortlessly"
}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Gemini API error (${response.status}): ${errBody}`);
      }

      const json = await response.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error('Gemini returned an empty response.');
      }

      // Parse and validate JSON
      const cleanJsonStr = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJsonStr);

      return {
        word: parsed.word || word,
        normalized_word: normalized,
        simple_meaning: parsed.simple_meaning || `Definition for ${word}`,
        detailed_meaning: parsed.detailed_meaning || parsed.simple_meaning,
        part_of_speech: parsed.part_of_speech || 'noun',
        example_sentence: parsed.example_sentence || `She used "${word}" in her writing.`,
        synonyms: Array.isArray(parsed.synonyms) ? parsed.synonyms : [],
        antonyms: Array.isArray(parsed.antonyms) ? parsed.antonyms : [],
        pronunciation: parsed.pronunciation || `/${normalized}/`,
        phonetic: parsed.phonetic || normalized,
        difficulty: ['easy', 'medium', 'hard'].includes(parsed.difficulty)
          ? parsed.difficulty
          : 'medium',
        usage_context: parsed.usage_context || 'Used in everyday or literary English.',
        memory_tip: parsed.memory_tip || `Remember "${word}" through its context.`,
        source: 'gemini',
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      throw err;
    }
  }
}
