import {
  BatchItemStatus,
  BatchWordItem,
  VocabularyStats,
  Word,
  WordProgress,
  WordWithProgress,
} from '../types/database';
import { isWordDue } from '../utils/spacedRepetition';
import { normalizeWord, parseMultiWordInput } from '../utils/wordNormalizer';
import { enrichWord } from './providers';
import { StreakService } from './streakService';
import { DEFAULT_USER_ID, getSupabaseClient, LocalDB } from './supabaseClient';

export class VocabularyService {
  /**
   * Retrieves all words joined with their spaced repetition progress and review history
   */
  static async getWords(): Promise<WordWithProgress[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data: wordsData, error: wordsError } = await supabase
          .from('words')
          .select('*')
          .eq('user_id', DEFAULT_USER_ID)
          .order('created_at', { ascending: false });

        if (wordsError) throw wordsError;

        const { data: progressData } = await supabase
          .from('word_progress')
          .select('*')
          .eq('user_id', DEFAULT_USER_ID);

        const { data: historyData } = await supabase
          .from('review_history')
          .select('*')
          .eq('user_id', DEFAULT_USER_ID)
          .order('reviewed_at', { ascending: false });

        const progressMap = new Map<string, WordProgress>();
        progressData?.forEach((p) => progressMap.set(p.word_id, p));

        const historyMap = new Map<string, any[]>();
        historyData?.forEach((h) => {
          const list = historyMap.get(h.word_id) || [];
          list.push(h);
          historyMap.set(h.word_id, list);
        });

        return (wordsData || []).map((w) => ({
          ...w,
          progress: progressMap.get(w.id),
          review_history: historyMap.get(w.id) || [],
        }));
      } catch (err) {
        console.warn('Failed to fetch words from Supabase, using local DB:', err);
      }
    }

    // Local DB fallback
    const localWords = LocalDB.getWords();
    const localProgress = LocalDB.getProgressList();
    const localHistory = LocalDB.getReviewHistory();

    const progressMap = new Map<string, WordProgress>();
    localProgress.forEach((p) => progressMap.set(p.word_id, p));

    const historyMap = new Map<string, any[]>();
    localHistory.forEach((h) => {
      const list = historyMap.get(h.word_id) || [];
      list.push(h);
      historyMap.set(h.word_id, list);
    });

    return localWords.map((w) => ({
      ...w,
      progress: progressMap.get(w.id),
      review_history: historyMap.get(w.id) || [],
    }));
  }

  /**
   * Checks if a normalized word already exists in the user's vocabulary
   */
  static async checkWordExists(normalizedWord: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('words')
          .select('id')
          .eq('user_id', DEFAULT_USER_ID)
          .eq('normalized_word', normalizedWord)
          .maybeSingle();

        if (error) throw error;
        return !!data;
      } catch (err) {
        console.warn('Supabase duplicate check failed, using local DB:', err);
      }
    }

    const localWords = LocalDB.getWords();
    return localWords.some((w) => w.normalized_word === normalizedWord);
  }

  /**
   * Adds a single word, enriches it via the provider layer, and initializes spaced repetition progress
   */
  static async addWord(rawWord: string): Promise<WordWithProgress> {
    const normalized = normalizeWord(rawWord);
    if (!normalized) {
      throw new Error('Word is empty or invalid.');
    }

    const exists = await this.checkWordExists(normalized);
    if (exists) {
      throw new Error(`"${normalized}" is already in your vocabulary.`);
    }

    // 1. Automatically enrich word via multi-provider pipeline
    const enrichment = await enrichWord(normalized);

    const newWordId = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : `word-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const newProgressId = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : `prog-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const now = new Date().toISOString();

    const wordRecord: Word = {
      id: newWordId,
      user_id: DEFAULT_USER_ID,
      word: enrichment.word || rawWord.trim(),
      normalized_word: normalized,
      simple_meaning: enrichment.simple_meaning,
      detailed_meaning: enrichment.detailed_meaning,
      part_of_speech: enrichment.part_of_speech,
      example_sentence: enrichment.example_sentence,
      synonyms: enrichment.synonyms || [],
      antonyms: enrichment.antonyms || [],
      pronunciation: enrichment.pronunciation,
      phonetic: enrichment.phonetic,
      difficulty: enrichment.difficulty || 'medium',
      usage_context: enrichment.usage_context,
      memory_tip: enrichment.memory_tip,
      created_at: now,
      updated_at: now,
    };

    const progressRecord: WordProgress = {
      id: newProgressId,
      word_id: newWordId,
      user_id: DEFAULT_USER_ID,
      status: 'learning',
      learning_stage: 'new',
      repetition_count: 0,
      interval_days: 0,
      ease_factor: 2.5,
      last_reviewed_at: null,
      next_review_at: now, // Due immediately so user can revise or learn right away
      correct_count: 0,
      incorrect_count: 0,
      forgot_count: 0,
      hard_count: 0,
      good_count: 0,
      easy_count: 0,
      created_at: now,
      updated_at: now,
    };

    // Save to Supabase if configured
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error: wordErr } = await supabase.from('words').insert(wordRecord);
        if (wordErr) throw wordErr;

        const { error: progErr } = await supabase.from('word_progress').insert(progressRecord);
        if (progErr) throw progErr;
      } catch (err) {
        console.warn('Failed to insert into Supabase, saving to local fallback:', err);
      }
    }

    // Always update local fallback
    const localWords = LocalDB.getWords();
    localWords.unshift(wordRecord);
    LocalDB.saveWords(localWords);

    const localProgress = LocalDB.getProgressList();
    localProgress.unshift(progressRecord);
    LocalDB.saveProgressList(localProgress);

    // Record streak activity
    await StreakService.recordActivity('words_added', 1);

    return {
      ...wordRecord,
      progress: progressRecord,
      review_history: [],
    };
  }

  /**
   * Batch adds multiple words with progress callbacks
   */
  static async addWordsBatch(
    rawInput: string,
    onProgress?: (item: BatchWordItem) => void
  ): Promise<BatchWordItem[]> {
    const rawTokens = parseMultiWordInput(rawInput);
    if (rawTokens.length === 0) {
      return [];
    }

    const items: BatchWordItem[] = rawTokens.map((w, idx) => ({
      id: `batch-${Date.now()}-${idx}`,
      rawInput: w,
      normalizedWord: normalizeWord(w),
      status: 'pending' as BatchItemStatus,
    }));

    for (const item of items) {
      item.status = 'processing';
      onProgress?.(item);

      try {
        const exists = await this.checkWordExists(item.normalizedWord);
        if (exists) {
          item.status = 'duplicate';
          item.error = 'Already in your vocabulary';
        } else {
          const result = await this.addWord(item.normalizedWord);
          item.status = 'done';
          item.result = result;
        }
      } catch (err: any) {
        item.status = 'error';
        item.error = err?.message || 'Failed to process word';
      }

      onProgress?.(item);
    }

    return items;
  }

  /**
   * Deletes a word and its progress/history
   */
  static async deleteWord(wordId: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error } = await supabase.from('words').delete().eq('id', wordId);
        if (error) throw error;
      } catch (err) {
        console.warn('Failed to delete word from Supabase, removing locally:', err);
      }
    }

    // Remove from local storage
    const words = LocalDB.getWords().filter((w) => w.id !== wordId);
    LocalDB.saveWords(words);

    const progress = LocalDB.getProgressList().filter((p) => p.word_id !== wordId);
    LocalDB.saveProgressList(progress);

    const history = LocalDB.getReviewHistory().filter((h) => h.word_id !== wordId);
    LocalDB.saveReviewHistory(history);

    return true;
  }

  /**
   * Computes statistics for dashboard
   */
  static async getVocabularyStats(): Promise<VocabularyStats> {
    const words = await this.getWords();
    const todayStr = new Date().toISOString().slice(0, 10);
    const now = new Date();

    let learningCount = 0;
    let learnedCount = 0;
    let dueCount = 0;
    let todayAddedCount = 0;

    for (const item of words) {
      if (item.progress) {
        if (item.progress.status === 'learned' || item.progress.status === 'mastered') {
          learnedCount++;
        } else {
          learningCount++;
        }

        if (isWordDue(item.progress, now)) {
          dueCount++;
        }
      } else {
        learningCount++;
        dueCount++;
      }

      if (item.created_at && item.created_at.slice(0, 10) === todayStr) {
        todayAddedCount++;
      }
    }

    return {
      totalWords: words.length,
      learningCount,
      learnedCount,
      dueCount,
      todayAddedCount,
    };
  }
}
