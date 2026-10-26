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

import {
  COMPREHENSIVE_SEED_WORDS as DEFAULT_SEED_WORDS,
  COMPREHENSIVE_SEED_PROGRESS as DEFAULT_SEED_PROGRESS,
} from '../data/seedWords';


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
