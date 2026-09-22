import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookCheck,
  CheckCircle2,
  Clock,
  Volume2,
  XCircle,
} from 'lucide-react';
import { WordWithProgress } from '../../types/database';
import { speakWord } from '../../utils/audioHelper';
import { useRevision } from '../../hooks/useRevision';
import { NavTab } from '../Layout/Navbar';

interface RevisionViewProps {
  onNavigate: (tab: NavTab) => void;
  onSelectWord?: (word: WordWithProgress) => void;
}

export const RevisionView: React.FC<RevisionViewProps> = ({
  onNavigate,
}) => {
  const {
    loading,
    totalDueCount,
    currentIndex,
    currentMCQ,
    selectedOptionId,
    isAnswerRevealed,
    isSubmittingRating,
    isSessionComplete,
    sessionStats,
    nextUpcomingReview,
    selectOption,
    submitRating,
  } = useRevision();

  // Keyboard shortcut listener for MCQ options (1-4, A-D) and Recall ratings (1-4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toLowerCase();

      if (!isAnswerRevealed && currentMCQ) {
        // Options selection
        if (key === '1' || key === 'a') selectOption(currentMCQ.options[0]?.id);
        else if (key === '2' || key === 'b') selectOption(currentMCQ.options[1]?.id);
        else if (key === '3' || key === 'c') selectOption(currentMCQ.options[2]?.id);
        else if (key === '4' || key === 'd') selectOption(currentMCQ.options[3]?.id);
      } else if (isAnswerRevealed && !isSubmittingRating) {
        // Recall rating selection
        if (key === '1' || key === 'f') submitRating('forgot');
        else if (key === '2' || key === 'h') submitRating('hard');
        else if (key === '3' || key === 'g') submitRating('good');
        else if (key === '4' || key === 'e') submitRating('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswerRevealed, currentMCQ, isSubmittingRating, selectOption, submitRating]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-secondary)' }}>
        <p>Loading your revision queue...</p>
      </div>
    );
  }

  // 1. Session Complete Screen
  if (isSessionComplete) {
    const accuracy =
      sessionStats.totalReviewed > 0
        ? Math.round((sessionStats.correctCount / sessionStats.totalReviewed) * 100)
        : 100;

    let nextReviewMsg = 'No more words scheduled right now.';
    if (nextUpcomingReview?.nextReviewAt) {
      const d = new Date(nextUpcomingReview.nextReviewAt);
      const isTomorrow =
        d.getDate() === new Date(Date.now() + 24 * 60 * 60 * 1000).getDate();
      const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      nextReviewMsg = `${nextUpcomingReview.count} word${
        nextUpcomingReview.count === 1 ? '' : 's'
      } ${isTomorrow ? 'tomorrow' : `on ${d.toLocaleDateString()}`} around ${timeStr}`;
    }

    return (
      <div className="revision-layout animate-fade-in" style={{ textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Revision Complete!</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem' }}>
            Great work! You've strengthened your memory pathways today.
          </p>

          {/* Stats Breakdown */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              maxWidth: '480px',
              margin: '0 auto 2rem',
            }}
          >
            <div style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reviewed</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{sessionStats.totalReviewed}</div>
            </div>

            <div style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--success)' }}>Correct</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--success)' }}>
                {sessionStats.correctCount}
              </div>
            </div>

            <div style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Accuracy</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                {accuracy}%
              </div>
            </div>
          </div>

          {/* Recall Ratings Distribution */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              maxWidth: '480px',
              margin: '0 auto 2rem',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 600 }}>
              Recall Breakdown
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.9rem' }}>
              <span style={{ color: '#34d399' }}>🟢 {sessionStats.easyCount} Easy</span>
              <span style={{ color: '#818cf8' }}>🔵 {sessionStats.goodCount} Good</span>
              <span style={{ color: '#fbbf24' }}>🟡 {sessionStats.hardCount} Hard</span>
              <span style={{ color: '#f87171' }}>🔴 {sessionStats.forgotCount} Forgot</span>
            </div>
          </div>

          {/* Next Scheduled Review */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              color: '#818cf8',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '2.5rem',
            }}
          >
            <Clock size={16} />
            <span>Next review: {nextReviewMsg}</span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={() => onNavigate('dashboard')}>
              Back to Dashboard
            </button>
            <button className="btn btn-primary" onClick={() => onNavigate('library')}>
              <span>Browse Vocabulary Library</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. All Caught Up Screen (No Words Due)
  if (totalDueCount === 0) {
    let nextReviewText = 'Tomorrow at 9:00 AM';
    if (nextUpcomingReview?.nextReviewAt) {
      const d = new Date(nextUpcomingReview.nextReviewAt);
      const isTomorrow =
        d.getDate() === new Date(Date.now() + 24 * 60 * 60 * 1000).getDate();
      const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      nextReviewText = `${isTomorrow ? 'Tomorrow' : d.toLocaleDateString()} at ${timeStr} (${
        nextUpcomingReview.count
      } word${nextUpcomingReview.count === 1 ? '' : 's'})`;
    }

    return (
      <div className="revision-layout animate-fade-in" style={{ textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '4rem 2rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>You're all caught up!</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '440px', margin: '0 auto 1.75rem' }}>
            There are no words due for revision right now according to your spaced repetition schedule.
          </p>

          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: '0.35rem',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              padding: '1rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '2.5rem',
            }}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Next Scheduled Revision
            </span>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
              {nextReviewText}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={() => onNavigate('dashboard')}>
              Dashboard
            </button>
            <button className="btn btn-primary" onClick={() => onNavigate('library')}>
              <BookCheck size={18} />
              <span>Explore Vocabulary Library</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Active MCQ Revision Card
  const progressPercent = Math.round(((currentIndex + 1) / totalDueCount) * 100);
  const selectedOption = currentMCQ?.options.find((o) => o.id === selectedOptionId);
  const isSelectedCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="revision-layout animate-fade-in">
      {/* Header with Progress Bar */}
      <div className="revision-header">
        <button
          className="icon-btn"
          onClick={() => onNavigate('dashboard')}
          title="Exit Revision Session"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
          {currentIndex + 1} / {totalDueCount}
        </span>
      </div>

      {/* Main MCQ Question Card */}
      {currentMCQ && (
        <div className="mcq-question-card">
          {/* Word Heading */}
          <div className="mcq-word-title">
            <span>{currentMCQ.word}</span>
            <button
              className="speaker-btn"
              onClick={() => speakWord(currentMCQ.word)}
              title="Pronounce"
            >
              <Volume2 size={18} />
            </button>
          </div>

          {/* Phonetic & Part of Speech */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {currentMCQ.phonetic && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {currentMCQ.phonetic}
              </span>
            )}
            {currentMCQ.partOfSpeech && (
              <span className="badge badge-pos">{currentMCQ.partOfSpeech}</span>
            )}
          </div>

          <p className="mcq-prompt-text">What does <strong>"{currentMCQ.word}"</strong> mean?</p>

          {/* Options Grid */}
          <div className="mcq-options-grid">
            {currentMCQ.options.map((option, idx) => {
              const optionLetter = ['A', 'B', 'C', 'D'][idx];
              const isSelected = selectedOptionId === option.id;

              let btnClass = 'mcq-option-btn';
              if (isAnswerRevealed) {
                if (option.isCorrect) {
                  btnClass += ' correct';
                } else if (isSelected && !option.isCorrect) {
                  btnClass += ' incorrect';
                }
              }

              return (
                <button
                  key={option.id}
                  className={btnClass}
                  onClick={() => selectOption(option.id)}
                  disabled={isAnswerRevealed}
                >
                  <div className="mcq-option-badge">{optionLetter}</div>
                  <span style={{ flex: 1 }}>{option.text}</span>
                  {!isAnswerRevealed && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      [{idx + 1}]
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback & Detail Reveal */}
          {isAnswerRevealed && (
            <div className={`feedback-box animate-fade-in ${isSelectedCorrect ? 'correct' : 'incorrect'}`}>
              <div className="feedback-title">
                {isSelectedCorrect ? (
                  <>
                    <CheckCircle2 size={20} className="feedback-correct" />
                    <span className="feedback-correct">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle size={20} className="feedback-incorrect" />
                    <span className="feedback-incorrect">Incorrect</span>
                  </>
                )}
              </div>

              {/* Detailed Explanation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.75rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>Meaning: </strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    {currentMCQ.detailedMeaning || currentMCQ.correctMeaning}
                  </span>
                </div>

                {currentMCQ.exampleSentence && (
                  <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9rem', borderLeft: '2px solid var(--accent-primary)', paddingLeft: '0.6rem' }}>
                    "{currentMCQ.exampleSentence}"
                  </div>
                )}

                {currentMCQ.memoryTip && (
                  <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', color: '#818cf8', fontSize: '0.85rem' }}>
                    💡 <strong>Memory tip:</strong> {currentMCQ.memoryTip}
                  </div>
                )}
              </div>

              {/* Recall Self-Assessment Rating Bar */}
              <div className="recall-section">
                <span className="recall-prompt">How well did you recall this word?</span>

                <div className="recall-ratings-grid">
                  <button
                    className="recall-btn forgot"
                    onClick={() => submitRating('forgot')}
                    disabled={isSubmittingRating}
                  >
                    <span>Forgot</span>
                    <span className="recall-key-tag">[1 / F]</span>
                  </button>

                  <button
                    className="recall-btn hard"
                    onClick={() => submitRating('hard')}
                    disabled={isSubmittingRating}
                  >
                    <span>Hard</span>
                    <span className="recall-key-tag">[2 / H]</span>
                  </button>

                  <button
                    className="recall-btn good"
                    onClick={() => submitRating('good')}
                    disabled={isSubmittingRating}
                  >
                    <span>Good</span>
                    <span className="recall-key-tag">[3 / G]</span>
                  </button>

                  <button
                    className="recall-btn easy"
                    onClick={() => submitRating('easy')}
                    disabled={isSubmittingRating}
                  >
                    <span>Easy</span>
                    <span className="recall-key-tag">[4 / E]</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
