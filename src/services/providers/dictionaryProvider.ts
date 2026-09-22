import { normalizeWord } from '../../utils/wordNormalizer';
import { EnrichmentResult, IVocabularyProvider } from './types';

interface DictionaryApiMeaning {
  partOfSpeech: string;
  definitions: {
    definition: string;
    example?: string;
    synonyms?: string[];
    antonyms?: string[];
  }[];
  synonyms?: string[];
  antonyms?: string[];
}

interface DictionaryApiResponse {
  word: string;
  phonetic?: string;
  phonetics?: { text?: string; audio?: string }[];
  meanings: DictionaryApiMeaning[];
}

export class DictionaryProvider implements IVocabularyProvider {
  name = 'Dictionary API';

  async enrichWord(word: string): Promise<EnrichmentResult> {
    const normalized = normalizeWord(word);
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(normalized)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Dictionary API error: status ${response.status}`);
      }

      const data: DictionaryApiResponse[] = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error(`Word "${word}" not found in Dictionary API`);
      }

      const entry = data[0];
      const primaryMeaning = entry.meanings?.[0];
      const primaryDef = primaryMeaning?.definitions?.[0];

      // Extract phonetic
      const phonetic =
        entry.phonetic ||
        entry.phonetics?.find((p) => p.text)?.text ||
        `/${normalized}/`;

      // Extract synonyms & antonyms across meanings
      const synonymsSet = new Set<string>();
      const antonymsSet = new Set<string>();

      entry.meanings?.forEach((m) => {
        m.synonyms?.forEach((s) => synonymsSet.add(s));
        m.antonyms?.forEach((a) => antonymsSet.add(a));
        m.definitions?.forEach((d) => {
          d.synonyms?.forEach((s) => synonymsSet.add(s));
          d.antonyms?.forEach((a) => antonymsSet.add(a));
        });
      });

      const partOfSpeech = primaryMeaning?.partOfSpeech || 'noun';
      const simpleMeaning = primaryDef?.definition || `A definition for ${word}`;
      const example =
        primaryDef?.example ||
        entry.meanings.find((m) => m.definitions.some((d) => d.example))?.definitions.find((d) => d.example)?.example ||
        `She used the word "${word}" in conversation.`;

      // Estimate difficulty based on length & syllables
      const difficulty =
        normalized.length <= 6 ? 'easy' : normalized.length <= 10 ? 'medium' : 'hard';

      return {
        word,
        normalized_word: normalized,
        simple_meaning: simpleMeaning,
        detailed_meaning: primaryDef?.definition || simpleMeaning,
        part_of_speech: partOfSpeech,
        example_sentence: example,
        synonyms: Array.from(synonymsSet).slice(0, 5),
        antonyms: Array.from(antonymsSet).slice(0, 4),
        pronunciation: phonetic,
        phonetic,
        difficulty,
        usage_context: `Commonly used in formal or standard English as a ${partOfSpeech}.`,
        memory_tip: `Associate "${word}" with key examples like: "${example}"`,
        source: 'dictionary',
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      throw err;
    }
  }
}
