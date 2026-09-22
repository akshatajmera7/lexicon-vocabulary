import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DailyActivity, ReviewHistory, UserProfile, Word, WordProgress } from '../types/database';

export const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000001';

const SUPABASE_CONFIG_KEY = 'lexicon_supabase_credentials_v1';

export interface SupabaseConfig {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export function getStoredSupabaseConfig(): SupabaseConfig {
  try {
    const raw = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to read Supabase config from storage:', e);
  }
  return {
    supabaseUrl: (import.meta as any).env?.VITE_SUPABASE_URL || '',
    supabaseAnonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '',
  };
}

export function saveStoredSupabaseConfig(config: SupabaseConfig): void {
  try {
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save Supabase config:', e);
  }
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const config = getStoredSupabaseConfig();
  if (config.supabaseUrl && config.supabaseAnonKey) {
    if (!supabaseInstance) {
      supabaseInstance = createClient(config.supabaseUrl, config.supabaseAnonKey);
    }
    return supabaseInstance;
  }
  return null;
}

export function resetSupabaseClient(): void {
  supabaseInstance = null;
}

// ============================================================================
// RESILIENT LOCAL STORAGE ENGINE (For standalone mode & instant testing)
// ============================================================================

const LOCAL_STORAGE_WORDS_KEY = 'lexicon_local_words_v1';
const LOCAL_STORAGE_PROGRESS_KEY = 'lexicon_local_progress_v1';
const LOCAL_STORAGE_HISTORY_KEY = 'lexicon_local_history_v1';
const LOCAL_STORAGE_ACTIVITY_KEY = 'lexicon_local_activity_v1';
const LOCAL_STORAGE_PROFILE_KEY = 'lexicon_local_profile_v1';

// Initial default seed words
const DEFAULT_SEED_WORDS: Word[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    user_id: DEFAULT_USER_ID,
    word: 'ephemeral',
    normalized_word: 'ephemeral',
    simple_meaning: 'Lasting for a very short time',
    detailed_meaning: 'Existing, occurring, or living for only a brief period; momentary or fleeting in nature.',
    part_of_speech: 'adjective',
    example_sentence: 'The beauty of the sunset was ephemeral, fading within minutes into twilight.',
    synonyms: ['fleeting', 'transitory', 'momentary', 'evanescent'],
    antonyms: ['permanent', 'enduring', 'perpetual', 'eternal'],
    pronunciation: '/ɪˈfɛm.ər.əl/',
    phonetic: 'ih-FEM-er-uhl',
    difficulty: 'medium',
    usage_context: 'Frequently used in literature and philosophy to describe brief experiences, art, or emotions.',
    memory_tip: 'Think of "ephemera" — things like concert tickets or autumn leaves that are brief and quickly fade.',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    user_id: DEFAULT_USER_ID,
    word: 'pragmatic',
    normalized_word: 'pragmatic',
    simple_meaning: 'Dealing with things sensibly and realistically based on practical considerations',
    detailed_meaning: 'Solving problems in a way that suits real conditions rather than following rigid theories.',
    part_of_speech: 'adjective',
    example_sentence: 'She took a pragmatic approach to team management, prioritizing results over rigid dogma.',
    synonyms: ['practical', 'sensible', 'realistic', 'utilitarian'],
    antonyms: ['idealistic', 'impractical', 'dogmatic'],
    pronunciation: '/præɡˈmæt.ɪk/',
    phonetic: 'prag-MAT-ik',
    difficulty: 'medium',
    usage_context: 'Used in business, politics, and decision making where practical utility beats theoretical idealism.',
    memory_tip: 'Rhymes with "automatic" — think of solving problems with practical tools right in front of you.',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333',
    user_id: DEFAULT_USER_ID,
    word: 'ubiquitous',
    normalized_word: 'ubiquitous',
    simple_meaning: 'Present, appearing, or found everywhere',
    detailed_meaning: 'Constantly encountered, widespread, or existing omnipresently in daily life.',
    part_of_speech: 'adjective',
    example_sentence: 'Smartphones have become ubiquitous in modern society, present in almost every pocket.',
    synonyms: ['omnipresent', 'pervasive', 'universal', 'widespread'],
    antonyms: ['rare', 'scarce', 'isolated', 'uncommon'],
    pronunciation: '/juːˈbɪk.wɪ.təs/',
    phonetic: 'yoo-BIK-wih-tus',
    difficulty: 'medium',
    usage_context: 'Used to describe technology, cultural trends, or natural phenomena that are pervasive.',
    memory_tip: 'Sounds like "you-be-everywhere" — something found at every corner you look.',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'a4444444-4444-4444-4444-444444444444',
    user_id: DEFAULT_USER_ID,
    word: 'tenacious',
    normalized_word: 'tenacious',
    simple_meaning: 'Tending to keep a firm hold of something; persistent and determined',
    detailed_meaning: 'Not easily stopped or pulled apart; demonstrating unrelenting resolve in the face of obstacles.',
    part_of_speech: 'adjective',
    example_sentence: 'Her tenacious spirit allowed her to finish the marathon despite severe muscle cramps.',
    synonyms: ['persistent', 'resolute', 'determined', 'unyielding'],
    antonyms: ['irresolute', 'yielding', 'wavering', 'weak'],
    pronunciation: '/təˈneɪ.ʃəs/',
    phonetic: 'tuh-NAY-shus',
    difficulty: 'medium',
    usage_context: 'Complimenting someone who never gives up on a tough objective.',
    memory_tip: 'Tenacious people hold on with "tenacity" like the grip of ten fingers.',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'a5555555-5555-5555-5555-555555555555',
    user_id: DEFAULT_USER_ID,
    word: 'serendipity',
    normalized_word: 'serendipity',
    simple_meaning: 'The occurrence of events by chance in a happy or beneficial way',
    detailed_meaning: 'Finding valuable or pleasant things not sought for; a fortunate stroke of luck.',
    part_of_speech: 'noun',
    example_sentence: 'Finding my favorite childhood book at a remote flea market was pure serendipity.',
    synonyms: ['fluke', 'good fortune', 'providence', 'lucky chance'],
    antonyms: ['misfortune', 'design', 'bad luck'],
    pronunciation: '/ˌser.ənˈdɪp.ə.ti/',
    phonetic: 'sair-en-DIP-ih-tee',
    difficulty: 'medium',
    usage_context: 'Used when celebrating pleasant surprises and unintended discoveries.',
    memory_tip: 'Think of "serene dip" — taking a calm dip into life and stumbling upon unexpected treasure.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DEFAULT_SEED_PROGRESS: WordProgress[] = [
  // ephemeral is due right now
  {
    id: 'p1111111-1111-1111-1111-111111111111',
    word_id: 'a1111111-1111-1111-1111-111111111111',
    user_id: DEFAULT_USER_ID,
    status: 'learning',
    learning_stage: 'learning',
    repetition_count: 1,
    interval_days: 1,
    ease_factor: 2.5,
    last_reviewed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    next_review_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour overdue
    correct_count: 1,
    incorrect_count: 0,
    forgot_count: 0,
    hard_count: 0,
    good_count: 1,
    easy_count: 0,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  // pragmatic is due right now
  {
    id: 'p2222222-2222-2222-2222-222222222222',
    word_id: 'a2222222-2222-2222-2222-222222222222',
    user_id: DEFAULT_USER_ID,
    status: 'learning',
    learning_stage: 'new',
    repetition_count: 0,
    interval_days: 0,
    ease_factor: 2.5,
    last_reviewed_at: null,
    next_review_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins overdue
    correct_count: 0,
    incorrect_count: 0,
    forgot_count: 0,
    hard_count: 0,
    good_count: 0,
    easy_count: 0,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  // ubiquitous is due in 2 days
  {
    id: 'p3333333-3333-3333-3333-333333333333',
    word_id: 'a3333333-3333-3333-3333-333333333333',
    user_id: DEFAULT_USER_ID,
    status: 'learning',
    learning_stage: 'learning',
    repetition_count: 2,
    interval_days: 3,
    ease_factor: 2.6,
    last_reviewed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    next_review_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    correct_count: 2,
    incorrect_count: 0,
    forgot_count: 0,
    hard_count: 0,
    good_count: 2,
    easy_count: 0,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  // tenacious is learned
  {
    id: 'p4444444-4444-4444-4444-444444444444',
    word_id: 'a4444444-4444-4444-4444-444444444444',
    user_id: DEFAULT_USER_ID,
    status: 'learned',
    learning_stage: 'reviewing',
    repetition_count: 4,
    interval_days: 14,
    ease_factor: 2.7,
    last_reviewed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    next_review_at: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString(),
    correct_count: 4,
    incorrect_count: 0,
    forgot_count: 0,
    hard_count: 0,
    good_count: 3,
    easy_count: 1,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  // serendipity is due tomorrow
  {
    id: 'p5555555-5555-5555-5555-555555555555',
    word_id: 'a5555555-5555-5555-5555-555555555555',
    user_id: DEFAULT_USER_ID,
    status: 'learning',
    learning_stage: 'new',
    repetition_count: 0,
    interval_days: 1,
    ease_factor: 2.5,
    last_reviewed_at: null,
    next_review_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    correct_count: 0,
    incorrect_count: 0,
    forgot_count: 0,
    hard_count: 0,
    good_count: 0,
    easy_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export class LocalDB {
  static getWords(): Word[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_WORDS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_WORDS_KEY, JSON.stringify(DEFAULT_SEED_WORDS));
      return DEFAULT_SEED_WORDS;
    }
    return JSON.parse(raw);
  }

  static saveWords(words: Word[]): void {
    localStorage.setItem(LOCAL_STORAGE_WORDS_KEY, JSON.stringify(words));
  }

  static getProgressList(): WordProgress[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_PROGRESS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(DEFAULT_SEED_PROGRESS));
      return DEFAULT_SEED_PROGRESS;
    }
    return JSON.parse(raw);
  }

  static saveProgressList(list: WordProgress[]): void {
    localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(list));
  }

  static getReviewHistory(): ReviewHistory[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  static saveReviewHistory(history: ReviewHistory[]): void {
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(history));
  }

  static getDailyActivities(): DailyActivity[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_ACTIVITY_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  static saveDailyActivities(activities: DailyActivity[]): void {
    localStorage.setItem(LOCAL_STORAGE_ACTIVITY_KEY, JSON.stringify(activities));
  }

  static getUserProfile(): UserProfile {
    const raw = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
    if (!raw) {
      const defaultProfile: UserProfile = {
        id: DEFAULT_USER_ID,
        current_streak: 3,
        longest_streak: 5,
        last_activity_date: new Date().toISOString().slice(0, 10),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(defaultProfile));
      return defaultProfile;
    }
    return JSON.parse(raw);
  }

  static saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(profile));
  }
}
