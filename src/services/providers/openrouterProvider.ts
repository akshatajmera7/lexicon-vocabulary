import { normalizeWord } from '../../utils/wordNormalizer';
import { EnrichmentResult, IVocabularyProvider, ProviderOptions } from './types';

export const FREE_OPENROUTER_MODELS = [
  { id: 'liquid/lfm-2.5-2.6b:free', name: 'LiquidAI: LFM 2.5 2.6B (Fast, Free - Recommended)' },
  { id: 'nvidia/nemotron-3.5-lightning:free', name: 'NVIDIA: Nemotron 3.5 Lightning (Free)' },
  { id: 'google/gemma-4-26b-a4b-it:free', name: 'Google: Gemma 4 26B (Free)' },
  { id: 'qwen/qwen3.8-27b:free', name: 'Qwen 3.8 27B (Free)' },
  { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1 (Free)' },
  { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B Instruct (Free)' },
];

export class OpenRouterProvider implements IVocabularyProvider {
  name = 'OpenRouter AI (Free/Paid)';

  async enrichWord(word: string, options?: ProviderOptions): Promise<EnrichmentResult> {
    const apiKey =
      options?.openrouterApiKey ||
      (import.meta as any).env?.VITE_OPENROUTER_API_KEY ||
      options?.openaiApiKey ||
      (import.meta as any).env?.VITE_OPENAI_API_KEY;

    const model =
      options?.openrouterModel ||
      (import.meta as any).env?.VITE_OPENROUTER_MODEL ||
      'liquid/lfm-2.5-2.6b:free';

    if (!apiKey) {
      throw new Error('OpenRouter API key is missing. Add your free key in Settings.');
    }

    const normalized = normalizeWord(word);
    const systemPrompt = `You are a vocabulary lexicographer. Respond ONLY with a valid JSON object explaining the given word.
No markdown backticks, no commentary.
JSON format:
{
  "word": "${normalized}",
  "simple_meaning": "A clear, simple sentence (under 15 words) explaining the core meaning in plain English",
  "detailed_meaning": "Detailed explanation with nuances and depth",
  "part_of_speech": "noun | verb | adjective | adverb | idiom | phrase",
  "example_sentence": "A natural, memorable example sentence showing real-world usage",
  "synonyms": ["synonym1", "synonym2", "synonym3"],
  "antonyms": ["antonym1", "antonym2"],
  "pronunciation": "/IPA pronunciation/",
  "phonetic": "easy phonetic spelling e.g. ih-FEM-er-uhl",
  "difficulty": "easy | medium | hard",
  "usage_context": "Where, when, and how this word is typically used",
  "memory_tip": "A clever mnemonic or mental image to remember it effortlessly"
}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 14000);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://lexicon-vocab.app',
          'X-OpenRouter-Title': 'Lexicon Vocabulary',
          'X-Title': 'Lexicon Vocabulary',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Define and enrich the English word "${normalized}"` },
          ],
          temperature: 0.2,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenRouter error (${response.status}): ${errText}`);
      }

      const json = await response.json();
      const rawContent = json?.choices?.[0]?.message?.content;
      if (!rawContent) {
        throw new Error('OpenRouter returned an empty response.');
      }

      // Parse JSON
      const cleanJsonStr = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJsonStr);

      return {
        word: parsed.word || word,
        normalized_word: normalized,
        simple_meaning: parsed.simple_meaning || `Meaning of ${word}`,
        detailed_meaning: parsed.detailed_meaning || parsed.simple_meaning,
        part_of_speech: parsed.part_of_speech || 'noun',
        example_sentence: parsed.example_sentence || `She used "${word}" in conversation.`,
        synonyms: Array.isArray(parsed.synonyms) ? parsed.synonyms : [],
        antonyms: Array.isArray(parsed.antonyms) ? parsed.antonyms : [],
        pronunciation: parsed.pronunciation || `/${normalized}/`,
        phonetic: parsed.phonetic || normalized,
        difficulty: ['easy', 'medium', 'hard'].includes(parsed.difficulty)
          ? parsed.difficulty
          : 'medium',
        usage_context: parsed.usage_context || 'Used in standard English.',
        memory_tip: parsed.memory_tip || `Remember "${word}" through practice.`,
        source: 'openai-compatible',
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      throw err;
    }
  }
}
