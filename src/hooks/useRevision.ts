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

export function useRevision() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dueWords, setDueWords] = useState<WordWithProgress[]>([]);
  const [allWords, setAllWords] = useState<WordWithProgress[]>([]);
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

  const initSession = useCallback(async () => {
    setLoading(true);
    try {
      const [due, all, upcoming] = await Promise.all([
        RevisionService.getDueWords(),
        VocabularyService.getWords(),
        RevisionService.getNextUpcomingReview(),
      ]);

      setDueWords(due);
      setAllWords(all);
      setNextUpcomingReview(upcoming);
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

      if (due.length > 0) {
        const firstMCQ = generateMCQ(due[0], all);
        setCurrentMCQ(firstMCQ);
      } else {
        setCurrentMCQ(null);
      }
    } catch (err) {
      console.error('Failed to initialize revision session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initSession();
  }, [initSession]);

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

      const currentWord = dueWords[currentIndex];
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
        if (nextIdx < dueWords.length) {
          const nextWord = dueWords[nextIdx];
          const nextMCQ = generateMCQ(nextWord, allWords);

          setCurrentIndex(nextIdx);
          setCurrentMCQ(nextMCQ);
          setSelectedOptionId(null);
          setIsAnswerRevealed(false);
        } else {
          // Session Completed!
          setIsSessionComplete(true);
          // Fetch updated next review info
          const upcoming = await RevisionService.getNextUpcomingReview();
          setNextUpcomingReview(upcoming);

          // Confetti celebration
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch (_e) {
            // Ignore if canvas confetti isn't supported in test env
          }
        }
      } catch (err) {
        console.error('Failed to submit revision rating:', err);
      } finally {
        setIsSubmittingRating(false);
      }
    },
    [currentMCQ, isSubmittingRating, dueWords, currentIndex, selectedOptionId, allWords]
  );

  return {
    loading,
    dueWords,
    totalDueCount: dueWords.length,
    currentIndex,
    currentWord: dueWords[currentIndex] as WordWithProgress | undefined,
    currentMCQ,
    selectedOptionId,
    isAnswerRevealed,
    isSubmittingRating,
    isSessionComplete,
    sessionStats,
    nextUpcomingReview,
    selectOption,
    submitRating,
    restartSession: initSession,
  };
}
