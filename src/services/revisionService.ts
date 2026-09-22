import {
  RecallRating,
  ReviewHistory,
  WordProgress,
  WordWithProgress,
} from '../types/database';
import { calculateNextReview, calculatePriorityScore, isWordDue } from '../utils/spacedRepetition';
import { StreakService } from './streakService';
import { DEFAULT_USER_ID, getSupabaseClient, LocalDB } from './supabaseClient';
import { VocabularyService } from './vocabularyService';

export interface NextUpcomingReviewInfo {
  nextReviewAt: string | null;
  count: number;
}

export class RevisionService {
  /**
   * Fetches only the words that are actually due for revision (next_review_at <= now).
   * Sorts by priority (most overdue, weakest history, fewer repetitions).
   */
  static async getDueWords(): Promise<WordWithProgress[]> {
    const allWords = await VocabularyService.getWords();
    const now = new Date();

    // Filter strictly due words
    const dueWords = allWords.filter((w) => isWordDue(w.progress, now));

    // Sort by priority score descending
    dueWords.sort((a, b) => calculatePriorityScore(b, now) - calculatePriorityScore(a, now));

    return dueWords;
  }

  /**
   * Finds information about when the next review session is due
   */
  static async getNextUpcomingReview(): Promise<NextUpcomingReviewInfo> {
    const allWords = await VocabularyService.getWords();
    const now = new Date();

    const futureWords = allWords
      .filter((w) => w.progress && new Date(w.progress.next_review_at) > now)
      .sort((a, b) => {
        const timeA = new Date(a.progress!.next_review_at).getTime();
        const timeB = new Date(b.progress!.next_review_at).getTime();
        return timeA - timeB;
      });

    if (futureWords.length === 0) {
      return { nextReviewAt: null, count: 0 };
    }

    const firstDate = futureWords[0].progress!.next_review_at;
    const firstDateDay = firstDate.slice(0, 10);
    const countOnSameDay = futureWords.filter(
      (w) => w.progress!.next_review_at.slice(0, 10) === firstDateDay
    ).length;

    return {
      nextReviewAt: firstDate,
      count: countOnSameDay,
    };
  }

  /**
   * Submits a completed MCQ revision answer & recall self-assessment.
   * Updates spaced repetition progress, logs review history, and marks streak activity.
   */
  static async submitReview(
    wordId: string,
    wasCorrect: boolean,
    rating: RecallRating
  ): Promise<{ updatedProgress: WordProgress; historyRecord: ReviewHistory }> {
    const words = await VocabularyService.getWords();
    const targetWord = words.find((w) => w.id === wordId);

    if (!targetWord) {
      throw new Error(`Word with id ${wordId} not found.`);
    }

    const currentProgress = targetWord.progress;
    const previousInterval = currentProgress?.interval_days ?? 0;

    // Calculate new SM-2 parameters
    const srResult = calculateNextReview(currentProgress, rating, new Date());

    const nowIso = new Date().toISOString();

    const updatedProgress: WordProgress = {
      id: currentProgress?.id || `prog-${Date.now()}`,
      word_id: wordId,
      user_id: DEFAULT_USER_ID,
      status: srResult.status,
      learning_stage: srResult.learning_stage,
      repetition_count: srResult.repetition_count,
      interval_days: srResult.interval_days,
      ease_factor: srResult.ease_factor,
      last_reviewed_at: nowIso,
      next_review_at: srResult.next_review_at,
      correct_count: (currentProgress?.correct_count || 0) + (wasCorrect ? 1 : 0),
      incorrect_count: (currentProgress?.incorrect_count || 0) + (wasCorrect ? 0 : 1),
      forgot_count: (currentProgress?.forgot_count || 0) + (rating === 'forgot' ? 1 : 0),
      hard_count: (currentProgress?.hard_count || 0) + (rating === 'hard' ? 1 : 0),
      good_count: (currentProgress?.good_count || 0) + (rating === 'good' ? 1 : 0),
      easy_count: (currentProgress?.easy_count || 0) + (rating === 'easy' ? 1 : 0),
      created_at: currentProgress?.created_at || nowIso,
      updated_at: nowIso,
    };

    const historyRecord: ReviewHistory = {
      id: (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : `hist-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      word_id: wordId,
      user_id: DEFAULT_USER_ID,
      reviewed_at: nowIso,
      was_correct: wasCorrect,
      rating,
      previous_interval: previousInterval,
      new_interval: srResult.interval_days,
      question_type: 'mcq',
    };

    // Save to Supabase
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('word_progress').upsert(updatedProgress);
        await supabase.from('review_history').insert(historyRecord);
      } catch (err) {
        console.warn('Failed to update review in Supabase, updating local storage:', err);
      }
    }

    // Always update local storage for offline resilience
    const localProgressList = LocalDB.getProgressList();
    const progIdx = localProgressList.findIndex((p) => p.word_id === wordId);
    if (progIdx >= 0) {
      localProgressList[progIdx] = updatedProgress;
    } else {
      localProgressList.push(updatedProgress);
    }
    LocalDB.saveProgressList(localProgressList);

    const localHistory = LocalDB.getReviewHistory();
    localHistory.unshift(historyRecord);
    LocalDB.saveReviewHistory(localHistory);

    // Record streak activity
    await StreakService.recordActivity('words_reviewed', 1);

    return {
      updatedProgress,
      historyRecord,
    };
  }
}
