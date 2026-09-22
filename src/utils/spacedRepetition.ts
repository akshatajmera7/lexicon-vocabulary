import { LearningStatus, LearningStage, RecallRating, WordProgress, WordWithProgress } from '../types/database';

export interface SpacedRepetitionResult {
  interval_days: number;
  ease_factor: number;
  repetition_count: number;
  status: LearningStatus;
  learning_stage: LearningStage;
  next_review_at: string;
}

/**
 * Calculates updated spaced repetition parameters using an enhanced SM-2 algorithm.
 */
export function calculateNextReview(
  currentProgress: Partial<WordProgress> | undefined,
  rating: RecallRating,
  baseDate: Date = new Date()
): SpacedRepetitionResult {
  const currentInterval = currentProgress?.interval_days ?? 0;
  const currentEase = currentProgress?.ease_factor ?? 2.5;
  const currentReps = currentProgress?.repetition_count ?? 0;

  let newInterval: number;
  let newEase = currentEase;
  let newReps = currentReps;

  switch (rating) {
    case 'forgot':
      // Reset repetitions and return word to 1-day interval
      newReps = 0;
      newInterval = 1;
      newEase = Math.max(1.3, currentEase - 0.20);
      break;

    case 'hard':
      if (currentReps === 0) {
        newInterval = 1;
      } else if (currentReps === 1) {
        newInterval = 2;
      } else {
        newInterval = Math.max(1, Math.round(currentInterval * 1.2));
      }
      newReps = currentReps + 1;
      newEase = Math.max(1.3, currentEase - 0.15);
      break;

    case 'good':
      if (currentReps === 0) {
        newInterval = 1;
      } else if (currentReps === 1) {
        newInterval = 3;
      } else if (currentReps === 2) {
        newInterval = 7;
      } else {
        newInterval = Math.round(currentInterval * currentEase);
      }
      newReps = currentReps + 1;
      // Stable ease factor on good recall
      newEase = currentEase;
      break;

    case 'easy':
      if (currentReps === 0) {
        newInterval = 2;
      } else if (currentReps === 1) {
        newInterval = 4;
      } else if (currentReps === 2) {
        newInterval = 10;
      } else {
        newInterval = Math.round(currentInterval * currentEase * 1.3);
      }
      newReps = currentReps + 1;
      newEase = Math.min(3.0, currentEase + 0.15);
      break;
  }

  // Ensure minimum interval is 1 day and clamp decimals
  newInterval = Math.max(1, Math.round(newInterval));
  newEase = Math.round(newEase * 100) / 100;

  // Determine learning stage and status
  let status: LearningStatus = 'learning';
  let learning_stage: LearningStage = 'learning';

  if (newInterval >= 60 || newReps >= 7) {
    status = 'mastered';
    learning_stage = 'mastered';
  } else if (newInterval >= 21 || newReps >= 4) {
    status = 'learned';
    learning_stage = 'reviewing';
  } else if (newReps === 0) {
    status = 'learning';
    learning_stage = 'new';
  } else {
    status = 'learning';
    learning_stage = 'learning';
  }

  // Next review date in ISO format
  const nextDate = new Date(baseDate.getTime() + newInterval * 24 * 60 * 60 * 1000);

  return {
    interval_days: newInterval,
    ease_factor: newEase,
    repetition_count: newReps,
    status,
    learning_stage,
    next_review_at: nextDate.toISOString(),
  };
}

/**
 * Calculates priority score for sorting due revision items.
 * Higher score = higher priority in the session queue.
 */
export function calculatePriorityScore(item: WordWithProgress, now: Date = new Date()): number {
  const progress = item.progress;
  if (!progress) return 100;

  const nextReview = new Date(progress.next_review_at).getTime();
  const overdueMs = Math.max(0, now.getTime() - nextReview);
  const overdueHours = overdueMs / (1000 * 60 * 60);

  // Overdue weight (1 point per hour overdue)
  const overdueScore = overdueHours * 1.5;

  // Weakness weight (forgot count and incorrect answers)
  const weaknessScore = (progress.forgot_count * 5) + (progress.incorrect_count * 3);

  // Lower repetition words get a slight priority boost
  const noveltyScore = Math.max(0, 10 - progress.repetition_count * 2);

  // Ease penalty (harder words prioritized)
  const easePenalty = (3.0 - (progress.ease_factor || 2.5)) * 10;

  return overdueScore + weaknessScore + noveltyScore + easePenalty;
}

/**
 * Checks if a word is currently due for revision.
 */
export function isWordDue(progress?: WordProgress, now: Date = new Date()): boolean {
  if (!progress) return true;
  return new Date(progress.next_review_at) <= now;
}

/**
 * Formats interval days into readable text (e.g. "1 day", "3 days", "2 months").
 */
export function formatInterval(days: number): string {
  if (days <= 0) return 'Immediate';
  if (days === 1) return '1 day';
  if (days < 30) return `${Math.round(days)} days`;
  if (days < 60) return '1 month';
  if (days < 365) return `${Math.round(days / 30)} months`;
  return `${(days / 365).toFixed(1)} years`;
}
