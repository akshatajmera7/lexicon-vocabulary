import { DifficultyLevel } from '../../types/database';

export interface EnrichmentResult {
  word: string;
  normalized_word: string;
  simple_meaning: string;
  detailed_meaning: string;
  part_of_speech: string;
  example_sentence: string;
  synonyms: string[];
  antonyms: string[];
  pronunciation: string;
  phonetic: string;
  difficulty: DifficultyLevel;
  usage_context: string;
  memory_tip: string;
  source: 'dictionary' | 'gemini' | 'openai-compatible' | 'hybrid' | 'fallback';
}

export interface IVocabularyProvider {
  name: string;
  enrichWord(word: string, options?: ProviderOptions): Promise<EnrichmentResult>;
}

export interface ProviderOptions {
  geminiApiKey?: string;
  openrouterApiKey?: string;
  openrouterModel?: string;
  openaiApiKey?: string;
  openaiBaseUrl?: string;
  openaiModel?: string;
  preferredProvider?: 'auto' | 'dictionary' | 'openrouter' | 'gemini' | 'openai' | 'edge-function';
  edgeFunctionUrl?: string;
  edgeFunctionAnonKey?: string;
}
