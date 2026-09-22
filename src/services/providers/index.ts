import { normalizeWord } from '../../utils/wordNormalizer';
import { DictionaryProvider } from './dictionaryProvider';
import { GeminiProvider } from './geminiProvider';
import { GenericLLMProvider } from './genericLlmProvider';
import { OpenRouterProvider } from './openrouterProvider';
import { EnrichmentResult, ProviderOptions } from './types';

export * from './openrouterProvider';
export * from './types';

const dictionaryProvider = new DictionaryProvider();
const geminiProvider = new GeminiProvider();
const openRouterProvider = new OpenRouterProvider();
const genericLlmProvider = new GenericLLMProvider();

const SETTINGS_STORAGE_KEY = 'lexicon_provider_settings_v1';

export function getStoredProviderOptions(): ProviderOptions {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse stored provider options:', e);
  }
  return {
    preferredProvider: 'auto',
    openrouterModel: 'google/gemini-2.0-flash-thinking-exp:free',
  };
}

export function saveStoredProviderOptions(options: ProviderOptions): void {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(options));
  } catch (e) {
    console.error('Failed to save provider options:', e);
  }
}

/**
 * Creates an intelligent fallback result if all external APIs are unreachable
 */
function createFallbackResult(word: string): EnrichmentResult {
  const normalized = normalizeWord(word);
  return {
    word,
    normalized_word: normalized,
    simple_meaning: `The meaning and concept represented by "${word}".`,
    detailed_meaning: `Definition and usage details for the word "${word}".`,
    part_of_speech: 'noun',
    example_sentence: `He mastered the term "${word}" during his vocabulary studies.`,
    synonyms: [],
    antonyms: [],
    pronunciation: `/${normalized}/`,
    phonetic: normalized,
    difficulty: normalized.length > 8 ? 'hard' : normalized.length > 5 ? 'medium' : 'easy',
    usage_context: 'General English usage.',
    memory_tip: `Connect "${word}" to the context where you first read it.`,
    source: 'fallback',
  };
}

/**
 * Main vocabulary enrichment pipeline:
 * Multi-layer fallback: OpenRouter / Gemini / Dictionary API -> AI Enrichment -> Fallback
 */
export async function enrichWord(
  word: string,
  customOptions?: ProviderOptions
): Promise<EnrichmentResult> {
  const options = { ...getStoredProviderOptions(), ...customOptions };
  const normalized = normalizeWord(word);

  if (!normalized) {
    throw new Error('Word cannot be empty.');
  }

  // 1. Explicit OpenRouter preference
  if (options.preferredProvider === 'openrouter' && (options.openrouterApiKey || options.openaiApiKey)) {
    try {
      return await openRouterProvider.enrichWord(normalized, options);
    } catch (err) {
      console.warn('OpenRouter preferred lookup failed, falling back to dictionary:', err);
    }
  }

  // 2. Explicit Gemini preference
  if (options.preferredProvider === 'gemini' && options.geminiApiKey) {
    try {
      return await geminiProvider.enrichWord(normalized, options);
    } catch (err) {
      console.warn('Gemini preferred enrichment failed, falling back to dictionary:', err);
    }
  }

  // 3. Explicit OpenAI / Custom LLM preference
  if (options.preferredProvider === 'openai' && options.openaiApiKey) {
    try {
      return await genericLlmProvider.enrichWord(normalized, options);
    } catch (err) {
      console.warn('OpenAI preferred enrichment failed, falling back to dictionary:', err);
    }
  }

  // 4. Auto / Hybrid Mode:
  // Step A: Attempt Dictionary API for instant lexical base
  let dictResult: EnrichmentResult | null = null;
  try {
    dictResult = await dictionaryProvider.enrichWord(normalized);
  } catch (err) {
    console.warn(`Dictionary lookup failed for "${normalized}", checking AI providers...`);
  }

  // Step B: Enrich with OpenRouter if key is available
  if (options.openrouterApiKey) {
    try {
      const aiResult = await openRouterProvider.enrichWord(normalized, options);
      if (dictResult) {
        return {
          ...dictResult,
          simple_meaning: aiResult.simple_meaning || dictResult.simple_meaning,
          memory_tip: aiResult.memory_tip || dictResult.memory_tip,
          usage_context: aiResult.usage_context || dictResult.usage_context,
          synonyms: Array.from(new Set([...(dictResult.synonyms || []), ...(aiResult.synonyms || [])])).slice(0, 5),
          antonyms: Array.from(new Set([...(dictResult.antonyms || []), ...(aiResult.antonyms || [])])).slice(0, 4),
          source: 'hybrid',
        };
      }
      return aiResult;
    } catch (aiErr) {
      console.warn('OpenRouter enrichment failed in hybrid step:', aiErr);
    }
  }

  // Step C: Enrich with Gemini if key is available
  if (options.geminiApiKey) {
    try {
      const aiResult = await geminiProvider.enrichWord(normalized, options);
      if (dictResult) {
        return {
          ...dictResult,
          simple_meaning: aiResult.simple_meaning || dictResult.simple_meaning,
          memory_tip: aiResult.memory_tip || dictResult.memory_tip,
          usage_context: aiResult.usage_context || dictResult.usage_context,
          synonyms: Array.from(new Set([...(dictResult.synonyms || []), ...(aiResult.synonyms || [])])).slice(0, 5),
          antonyms: Array.from(new Set([...(dictResult.antonyms || []), ...(aiResult.antonyms || [])])).slice(0, 4),
          source: 'hybrid',
        };
      }
      return aiResult;
    } catch (aiErr) {
      console.warn('Gemini enrichment failed in hybrid step:', aiErr);
    }
  }

  // Step D: If Dictionary succeeded without AI, return it
  if (dictResult) {
    return dictResult;
  }

  // Step E: Final fallback
  return createFallbackResult(word);
}
