import { normalizeWord } from '../../utils/wordNormalizer';
import { EnrichmentResult, IVocabularyProvider, ProviderOptions } from './types';

export class GenericLLMProvider implements IVocabularyProvider {
  name = 'Custom LLM / Kimi';

  async enrichWord(word: string, options?: ProviderOptions): Promise<EnrichmentResult> {
    const apiKey = options?.openaiApiKey || (import.meta as any).env?.VITE_OPENAI_API_KEY;
    const baseUrl = options?.openaiBaseUrl || (import.meta as any).env?.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1';
    const model = options?.openaiModel || (import.meta as any).env?.VITE_OPENAI_MODEL || 'gpt-4o-mini';

    if (!apiKey) {
      throw new Error('LLM API key is not configured.');
    }

    const normalized = normalizeWord(word);
    const systemPrompt = `You are a vocabulary expert. Respond ONLY with a valid JSON object explaining the given word.
JSON format:
{
  "word": "${normalized}",
  "simple_meaning": "Concise plain-English explanation under 15 words",
  "detailed_meaning": "Comprehensive explanation with nuances",
  "part_of_speech": "noun | verb | adjective | adverb | idiom | phrase",
  "example_sentence": "Engaging realistic example sentence",
  "synonyms": ["synonym1", "synonym2"],
  "antonyms": ["antonym1", "antonym2"],
  "pronunciation": "/IPA/",
  "phonetic": "easy phonetic spelling",
  "difficulty": "easy | medium | hard",
  "usage_context": "When and how to use it",
  "memory_tip": "Clever mnemonic or visual connection"
}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Enrich this word: "${normalized}"` },
          ],
          temperature: 0.2,
          response_format: { type: 'json_object' },
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`LLM API error (${response.status}): ${errText}`);
      }

      const json = await response.json();
      const content = json?.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('Empty response from LLM provider.');
      }

      const parsed = JSON.parse(content);

      return {
        word: parsed.word || word,
        normalized_word: normalized,
        simple_meaning: parsed.simple_meaning || `Definition for ${word}`,
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
        usage_context: parsed.usage_context || 'Standard English usage.',
        memory_tip: parsed.memory_tip || `Remember "${word}" through practice.`,
        source: 'openai-compatible',
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      throw err;
    }
  }
}
