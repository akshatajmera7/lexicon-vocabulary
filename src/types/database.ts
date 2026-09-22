export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection'
  | 'idiom'
  | 'phrase'
  | 'other';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type LearningStatus = 'learning' | 'learned' | 'mastered';
export type LearningStage = 'new' | 'learning' | 'reviewing' | 'mastered';
export type RecallRating = 'forgot' | 'hard' | 'good' | 'easy';

export interface Word {
  id: string;
  user_id: string;
  word: string;
  normalized_word: string;
  simple_meaning: string;
  detailed_meaning?: string;
  part_of_speech?: string;
  example_sentence?: string;
  synonyms: string[];
  antonyms: string[];
  pronunciation?: string;
  phonetic?: string;
  difficulty: DifficultyLevel;
  usage_context?: string;
  memory_tip?: string;
  created_at: string;
  updated_at: string;
}

export interface WordProgress {
  id: string;
  word_id: string;
  user_id: string;
  status: LearningStatus;
  learning_stage: LearningStage;
  repetition_count: number;
  interval_days: number;
  ease_factor: number;
  last_reviewed_at: string | null;
  next_review_at: string;
  correct_count: number;
  incorrect_count: number;
  forgot_count: number;
  hard_count: number;
  good_count: number;
  easy_count: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewHistory {
  id: string;
  word_id: string;
  user_id: string;
  reviewed_at: string;
  was_correct: boolean;
  rating: RecallRating;
  previous_interval: number;
  new_interval: number;
  question_type: string;
}

export interface DailyActivity {
  id: string;
  user_id: string;
  activity_date: string; // YYYY-MM-DD
  words_added: number;
  words_reviewed: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface WordWithProgress extends Word {
  progress?: WordProgress;
  review_history?: ReviewHistory[];
}

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
  wordSource?: string;
}

export interface MCQQuestion {
  wordId: string;
  word: string;
  correctMeaning: string;
  partOfSpeech?: string;
  exampleSentence?: string;
  phonetic?: string;
  memoryTip?: string;
  detailedMeaning?: string;
  options: MCQOption[];
  correctIndex: number;
}

export type BatchItemStatus = 'pending' | 'processing' | 'done' | 'duplicate' | 'error';

export interface BatchWordItem {
  id: string;
  rawInput: string;
  normalizedWord: string;
  status: BatchItemStatus;
  error?: string;
  result?: Word;
}

export interface VocabularyStats {
  totalWords: number;
  learningCount: number;
  learnedCount: number;
  dueCount: number;
  todayAddedCount: number;
}
