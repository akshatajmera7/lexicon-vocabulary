import { useCallback, useEffect, useMemo, useState } from 'react';
import { BatchWordItem, DifficultyLevel, VocabularyStats, WordWithProgress } from '../types/database';
import { isWordDue } from '../utils/spacedRepetition';
import { VocabularyService } from '../services/vocabularyService';

export type StatusFilter = 'all' | 'due' | 'learning' | 'learned';
export type SortOption = 'newest' | 'alphabetical' | 'next_review' | 'difficulty';

export function useVocabulary() {
  const [words, setWords] = useState<WordWithProgress[]>([]);
  const [stats, setStats] = useState<VocabularyStats>({
    totalWords: 0,
    learningCount: 0,
    learnedCount: 0,
    dueCount: 0,
    todayAddedCount: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const fetchVocabulary = useCallback(async () => {
    setLoading(true);
    try {
      const [wordList, statData] = await Promise.all([
        VocabularyService.getWords(),
        VocabularyService.getVocabularyStats(),
      ]);
      setWords(wordList);
      setStats(statData);
    } catch (err) {
      console.error('Failed to load vocabulary:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVocabulary();
  }, [fetchVocabulary]);

  const addWord = async (rawWord: string) => {
    const newWord = await VocabularyService.addWord(rawWord);
    await fetchVocabulary();
    return newWord;
  };

  const addWordsBatch = async (
    rawInput: string,
    onProgress?: (item: BatchWordItem) => void
  ) => {
    const results = await VocabularyService.addWordsBatch(rawInput, onProgress);
    await fetchVocabulary();
    return results;
  };

  const deleteWord = async (wordId: string) => {
    const success = await VocabularyService.deleteWord(wordId);
    if (success) {
      setWords((prev) => prev.filter((w) => w.id !== wordId));
      fetchVocabulary();
    }
    return success;
  };

  // Filtered and sorted word list
  const filteredWords = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const now = new Date();

    return words
      .filter((w) => {
        // Search filter
        if (query) {
          const matchWord = w.word.toLowerCase().includes(query);
          const matchMeaning = w.simple_meaning.toLowerCase().includes(query);
          const matchContext = w.usage_context?.toLowerCase().includes(query);
          const matchSynonym = w.synonyms.some((s) => s.toLowerCase().includes(query));
          if (!matchWord && !matchMeaning && !matchContext && !matchSynonym) {
            return false;
          }
        }

        // Status tab filter
        if (statusFilter === 'due') {
          return isWordDue(w.progress, now);
        } else if (statusFilter === 'learning') {
          return w.progress?.status === 'learning';
        } else if (statusFilter === 'learned') {
          return w.progress?.status === 'learned' || w.progress?.status === 'mastered';
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        } else if (sortBy === 'alphabetical') {
          return a.word.localeCompare(b.word);
        } else if (sortBy === 'next_review') {
          const timeA = a.progress ? new Date(a.progress.next_review_at).getTime() : 0;
          const timeB = b.progress ? new Date(b.progress.next_review_at).getTime() : 0;
          return timeA - timeB;
        } else if (sortBy === 'difficulty') {
          const diffScore: Record<DifficultyLevel, number> = { easy: 1, medium: 2, hard: 3 };
          return (diffScore[b.difficulty] || 2) - (diffScore[a.difficulty] || 2);
        }
        return 0;
      });
  }, [words, searchQuery, statusFilter, sortBy]);

  // Group words by date (Today, Yesterday, Date)
  const groupedByDate = useMemo(() => {
    const groups: { label: string; dateKey: string; words: WordWithProgress[] }[] = [];
    const todayStr = new Date().toISOString().slice(0, 10);
    const yesterdayStr = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const map = new Map<string, WordWithProgress[]>();

    for (const w of filteredWords) {
      const dateKey = w.created_at ? w.created_at.slice(0, 10) : 'Unknown';
      const list = map.get(dateKey) || [];
      list.push(w);
      map.set(dateKey, list);
    }

    map.forEach((wList, dateKey) => {
      let label = dateKey;
      if (dateKey === todayStr) {
        label = 'Today';
      } else if (dateKey === yesterdayStr) {
        label = 'Yesterday';
      } else if (dateKey !== 'Unknown') {
        const d = new Date(dateKey);
        label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      }

      groups.push({
        label,
        dateKey,
        words: wList,
      });
    });

    return groups;
  }, [filteredWords]);

  return {
    words,
    filteredWords,
    groupedByDate,
    stats,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    addWord,
    addWordsBatch,
    deleteWord,
    refresh: fetchVocabulary,
  };
}
