import { useCallback, useEffect, useState } from 'react';
import { UserProfile } from '../types/database';
import { StreakService } from '../services/streakService';

export function useStreak() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStreak = useCallback(async () => {
    setLoading(true);
    try {
      const data = await StreakService.getUserProfile();
      setProfile(data);
    } catch (err) {
      console.error('Failed to load streak profile:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  return {
    profile,
    currentStreak: profile?.current_streak ?? 0,
    longestStreak: profile?.longest_streak ?? 0,
    lastActivityDate: profile?.last_activity_date ?? null,
    loading,
    refreshStreak: fetchStreak,
  };
}
