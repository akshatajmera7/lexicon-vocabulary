import { useCallback, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { MCQQuestion, RecallRating, WordWithProgress } from '../types/database';
import { generateMCQ } from '../utils/mcqGenerator';
import { NextUpcomingReviewInfo, RevisionService } from '../services/revisionService';
import { VocabularyService } from '../services/vocabularyService';

export interface SessionStats {
  totalReviewed: number;
  correctCount: number;
  incorrectCount: number;
  forgotCount: number;
  hardCount: number;
  goodCount: number;
  easyCount: number;
}

export type RevisionMode = 'due' | 'practice';

export function useRevision() {
  const [loading, setLoading] = useState<boolean>(true);
  const [mode, setMode] = useState<RevisionMode>('due');
  const [activeWords, setActiveWords] = useState<WordWithProgress[]>([]);
  const [allWords, setAllWords] = useState<WordWithProgress[]>([]);
  const [dueCount, setDueCount] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentMCQ, setCurrentMCQ] = useState<MCQQuestion | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState<boolean>(false);
  const [isSessionComplete, setIsSessionComplete] = useState<boolean>(false);
  const [nextUpcomingReview, setNextUpcomingReview] = useState<NextUpcomingReviewInfo | null>(null);

  const [sessionStats, setSessionStats] = useState<SessionStats>({
    totalReviewed: 0,
    correctCount: 0,
    incorrectCount: 0,
    forgotCount: 0,
    hardCount: 0,
    goodCount: 0,
    easyCount: 0,
  });

  const startSessionWithWords = useCallback(
    (wordsToReview: WordWithProgress[], allLibraryWords: WordWithProgress[], sessionMode: RevisionMode) => {
      setMode(sessionMode);
      setActiveWords(wordsToReview);
      setCurrentIndex(0);
      setSelectedOptionId(null);
      setIsAnswerRevealed(false);
      setIsSessionComplete(false);
      setSessionStats({
        totalReviewed: 0,
        correctCount: 0,
        incorrectCount: 0,
        forgotCount: 0,
        hardCount: 0,
        goodCount: 0,
        easyCount: 0,
      });

      if (wordsToReview.length > 0) {
        const firstMCQ = generateMCQ(wordsToReview[0], allLibraryWords);
        setCurrentMCQ(firstMCQ);
      } else {
        setCurrentMCQ(null);
      }
    },
    []
  );

  const initSession = useCallback(
    async (preferredMode: RevisionMode = 'due') => {
      setLoading(true);
      try {
        const [due, all, upcoming] = await Promise.all([
          RevisionService.getDueWords(),
          VocabularyService.getWords(),
          RevisionService.getNextUpcomingReview(),
        ]);

        setAllWords(all);
        setDueCount(due.length);
        setNextUpcomingReview(upcoming);

        if (preferredMode === 'practice' || (preferredMode === 'due' && due.length === 0 && all.length > 0)) {
          // Shuffle all words for practice
          const shuffled = [...all].sort(() => Math.random() - 0.5);
          startSessionWithWords(shuffled, all, preferredMode === 'practice' ? 'practice' : 'due');
        } else {
          startSessionWithWords(due, all, 'due');
        }
      } catch (err) {
        console.error('Failed to initialize revision session:', err);
      } finally {
        setLoading(false);
      }
    },
    [startSessionWithWords]
  );

  useEffect(() => {
    initSession('due');
  }, [initSession]);

  const startPracticeMode = useCallback(() => {
    if (allWords.length === 0) return;
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    startSessionWithWords(shuffled, allWords, 'practice');
  }, [allWords, startSessionWithWords]);

  const startDueMode = useCallback(async () => {
    setLoading(true);
    try {
      const due = await RevisionService.getDueWords();
      setDueCount(due.length);
      startSessionWithWords(due, allWords, 'due');
    } finally {
      setLoading(false);
    }
  }, [allWords, startSessionWithWords]);

  const selectOption = useCallback(
    (optionId: string) => {
      if (isAnswerRevealed || !currentMCQ) return;
      setSelectedOptionId(optionId);
      setIsAnswerRevealed(true);
    },
    [isAnswerRevealed, currentMCQ]
  );

  const submitRating = useCallback(
    async (rating: RecallRating) => {
      if (!currentMCQ || isSubmittingRating) return;

      const currentWord = activeWords[currentIndex];
      const selectedOption = currentMCQ.options.find((o) => o.id === selectedOptionId);
      const wasCorrect = selectedOption?.isCorrect ?? false;

      setIsSubmittingRating(true);

      try {
        await RevisionService.submitReview(currentWord.id, wasCorrect, rating);

        // Update session stats
        setSessionStats((prev) => ({
          totalReviewed: prev.totalReviewed + 1,
          correctCount: prev.correctCount + (wasCorrect ? 1 : 0),
          incorrectCount: prev.incorrectCount + (wasCorrect ? 0 : 1),
          forgotCount: prev.forgotCount + (rating === 'forgot' ? 1 : 0),
          hardCount: prev.hardCount + (rating === 'hard' ? 1 : 0),
          goodCount: prev.goodCount + (rating === 'good' ? 1 : 0),
          easyCount: prev.easyCount + (rating === 'easy' ? 1 : 0),
        }));

        // Check if there is a next word
        const nextIdx = currentIndex + 1;
        if (nextIdx < activeWords.length) {
          const nextWord = activeWords[nextIdx];
          const nextMCQ = generateMCQ(nextWord, allWords);

          setCurrentIndex(nextIdx);
          setCurrentMCQ(nextMCQ);
          setSelectedOptionId(null);
          setIsAnswerRevealed(false);
        } else {
          // Session Completed!
          setIsSessionComplete(true);
          const upcoming = await RevisionService.getNextUpcomingReview();
          setNextUpcomingReview(upcoming);

          try {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
            });
          } catch (_e) {
            // Ignore if canvas confetti isn't supported
          }
        }
      } catch (err) {
        console.error('Failed to submit revision rating:', err);
      } finally {
        setIsSubmittingRating(false);
      }
    },
    [currentMCQ, isSubmittingRating, activeWords, currentIndex, selectedOptionId, allWords]
  );

  return {
    loading,
    mode,
    activeWords,
    dueWords: activeWords,
    totalDueCount: dueCount,
    totalSessionWords: activeWords.length,
    allWordsCount: allWords.length,
    currentIndex,
    currentWord: activeWords[currentIndex] as WordWithProgress | undefined,
    currentMCQ,
    selectedOptionId,
    isAnswerRevealed,
    isSubmittingRating,
    isSessionComplete,
    sessionStats,
    nextUpcomingReview,
    selectOption,
    submitRating,
    startPracticeMode,
    startDueMode,
    restartSession: () => (mode === 'practice' ? startPracticeMode() : initSession('due')),
  };
}
