import { DailyActivity, UserProfile } from '../types/database';
import { DEFAULT_USER_ID, getSupabaseClient, LocalDB } from './supabaseClient';

export class StreakService {
  /**
   * Formats a date as YYYY-MM-DD
   */
  static getTodayDateString(): string {
    return new Date().toISOString().slice(0, 10);
  }

  /**
   * Retrieves the current user profile with streak details
   */
  static async getUserProfile(): Promise<UserProfile> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', DEFAULT_USER_ID)
          .maybeSingle();

        if (error) throw error;
        if (data) return data as UserProfile;

        // Initialize profile if not present
        const newProfile: UserProfile = {
          id: DEFAULT_USER_ID,
          current_streak: 0,
          longest_streak: 0,
          last_activity_date: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        await supabase.from('user_profiles').insert(newProfile);
        return newProfile;
      } catch (err) {
        console.warn('Failed to fetch user profile from Supabase, fallback to local:', err);
      }
    }

    return LocalDB.getUserProfile();
  }

  /**
   * Records a learning activity (e.g. added words or completed revision) and updates streak accurately.
   */
  static async recordActivity(
    type: 'words_added' | 'words_reviewed',
    count: number = 1
  ): Promise<UserProfile> {
    const today = this.getTodayDateString();
    const profile = await this.getUserProfile();
    const lastActive = profile.last_activity_date;

    let newCurrentStreak = profile.current_streak;
    let newLongestStreak = profile.longest_streak;

    if (!lastActive) {
      // First ever activity!
      newCurrentStreak = 1;
    } else if (lastActive === today) {
      // Activity on same day - streak remains unchanged, but activity count increases!
      newCurrentStreak = Math.max(1, profile.current_streak);
    } else {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      if (lastActive === yesterday) {
        // Consecutive day streak!
        newCurrentStreak = profile.current_streak + 1;
      } else {
        // Missed a day or more: streak resets to 1 today
        newCurrentStreak = 1;
      }
    }

    newLongestStreak = Math.max(newLongestStreak, newCurrentStreak);

    const updatedProfile: UserProfile = {
      ...profile,
      current_streak: newCurrentStreak,
      longest_streak: newLongestStreak,
      last_activity_date: today,
      updated_at: new Date().toISOString(),
    };

    // Save to Supabase or LocalDB
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('user_profiles').upsert(updatedProfile);

        // Update or insert daily_activity record
        const { data: existingActivity } = await supabase
          .from('daily_activity')
          .select('*')
          .eq('user_id', DEFAULT_USER_ID)
          .eq('activity_date', today)
          .maybeSingle();

        if (existingActivity) {
          const updatePayload: Partial<DailyActivity> = {};
          if (type === 'words_added') {
            updatePayload.words_added = (existingActivity.words_added || 0) + count;
          } else {
            updatePayload.words_reviewed = (existingActivity.words_reviewed || 0) + count;
          }
          await supabase
            .from('daily_activity')
            .update(updatePayload)
            .eq('id', existingActivity.id);
        } else {
          await supabase.from('daily_activity').insert({
            user_id: DEFAULT_USER_ID,
            activity_date: today,
            words_added: type === 'words_added' ? count : 0,
            words_reviewed: type === 'words_reviewed' ? count : 0,
          });
        }
      } catch (err) {
        console.warn('Failed to save activity to Supabase, updating local fallback:', err);
      }
    }

    // Always update local fallback for offline consistency
    LocalDB.saveUserProfile(updatedProfile);
    const localActivities = LocalDB.getDailyActivities();
    const existingIdx = localActivities.findIndex((a) => a.activity_date === today);
    if (existingIdx >= 0) {
      if (type === 'words_added') {
        localActivities[existingIdx].words_added += count;
      } else {
        localActivities[existingIdx].words_reviewed += count;
      }
    } else {
      localActivities.unshift({
        id: `act-${Date.now()}`,
        user_id: DEFAULT_USER_ID,
        activity_date: today,
        words_added: type === 'words_added' ? count : 0,
        words_reviewed: type === 'words_reviewed' ? count : 0,
        created_at: new Date().toISOString(),
      });
    }
    LocalDB.saveDailyActivities(localActivities);

    return updatedProfile;
  }

  /**
   * Checks how many words were added today
   */
  static async getTodayAddedCount(): Promise<number> {
    const today = this.getTodayDateString();
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data } = await supabase
          .from('daily_activity')
          .select('words_added')
          .eq('user_id', DEFAULT_USER_ID)
          .eq('activity_date', today)
          .maybeSingle();

        if (data) return data.words_added || 0;
      } catch (e) {
        console.warn('Failed to query today added from Supabase:', e);
      }
    }

    const local = LocalDB.getDailyActivities().find((a) => a.activity_date === today);
    return local?.words_added || 0;
  }
}
