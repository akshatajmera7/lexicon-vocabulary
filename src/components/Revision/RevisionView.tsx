import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookCheck,
  BookOpen,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
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
    mode,
    totalDueCount,
    totalSessionWords,
    allWordsCount,
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
    startPracticeMode,
    startDueMode,
    restartSession,
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
        <p>Loading flashcards and revision queue...</p>
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
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-xs)', background: 'var(--text-primary)', color: 'var(--bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={28} />
            </div>
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>
            {mode === 'practice' ? 'Practice Round Complete!' : 'Revision Complete!'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            {mode === 'practice'
              ? `You reviewed ${sessionStats.totalReviewed} vocabulary flashcards in unlimited practice mode.`
              : "You've completed all scheduled repetitions for this session."}
          </p>

          {/* Stats Breakdown */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              maxWidth: '440px',
              margin: '0 auto 1.75rem',
            }}
          >
            <div style={{ background: 'var(--bg-surface-low)', padding: '0.9rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Reviewed</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{sessionStats.totalReviewed}</div>
            </div>

            <div style={{ background: 'var(--bg-surface-low)', padding: '0.9rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Correct</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {sessionStats.correctCount}
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface-low)', padding: '0.9rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Accuracy</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {accuracy}%
              </div>
            </div>
          </div>

          {/* Recall Ratings Distribution */}
          <div
            style={{
              background: 'var(--bg-surface-low)',
              borderRadius: 'var(--radius-xs)',
              padding: '1rem',
              maxWidth: '440px',
              margin: '0 auto 1.75rem',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Recall Breakdown
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span>{sessionStats.easyCount} Easy</span>
              <span>•</span>
              <span>{sessionStats.goodCount} Good</span>
              <span>•</span>
              <span>{sessionStats.hardCount} Hard</span>
              <span>•</span>
              <span>{sessionStats.forgotCount} Forgot</span>
            </div>
          </div>

          {/* Next Scheduled Review */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--bg-surface-low)',
              border: '1px solid var(--border-subtle)',
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-xs)',
              color: 'var(--text-secondary)',
              fontSize: '0.825rem',
              fontFamily: 'var(--font-mono)',
              marginBottom: '2rem',
            }}
          >
            <Clock size={14} color="var(--text-muted)" />
            <span>Next review: {nextReviewMsg}</span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button className="btn btn-primary" onClick={restartSession}>
              <RotateCcw size={15} />
              <span>Practice Again (Shuffle)</span>
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigate('dashboard')}>
              Dashboard
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigate('library')}>
              <span>Vault</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. All Caught Up Screen (No Words Due & Not in Practice Mode)
  if (totalSessionWords === 0) {
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
        <div className="glass-card" style={{ padding: '3.5rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-xs)', background: 'var(--bg-surface-high)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookCheck size={22} />
            </div>
          </div>
          <h1 style={{ fontSize: '1.85rem', marginBottom: '0.4rem' }}>Due Queue Caught Up</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
            No words due for scheduled spaced repetition. You can still practice unlimited flashcards anytime!
          </p>

          {allWordsCount > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <button
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
                onClick={startPracticeMode}
              >
                <Sparkles size={16} />
                <span>Practice All {allWordsCount} Words (Unlimited Mode)</span>
              </button>
            </div>
          )}

          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: '0.25rem',
              background: 'var(--bg-surface-low)',
              border: '1px solid var(--border-subtle)',
              padding: '0.85rem 1.5rem',
              borderRadius: 'var(--radius-xs)',
              marginBottom: '2rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Next Scheduled Spaced Review
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {nextReviewText}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={() => onNavigate('dashboard')}>
              Dashboard
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigate('library')}>
              <BookOpen size={15} />
              <span>Library</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Active MCQ Revision Card
  const progressPercent = Math.round(((currentIndex + 1) / totalSessionWords) * 100);
  const selectedOption = currentMCQ?.options.find((o) => o.id === selectedOptionId);
  const isSelectedCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="revision-layout animate-fade-in">
      {/* Mode Switcher & Session Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <div className="filter-tabs">
          <button
            className={`filter-tab ${mode === 'due' ? 'active' : ''}`}
            onClick={startDueMode}
            title="Spaced Repetition Due Queue"
          >
            <span>Due ({totalDueCount})</span>
          </button>
          <button
            className={`filter-tab ${mode === 'practice' ? 'active' : ''}`}
            onClick={startPracticeMode}
            title="Unlimited Practice Across All Library Words"
          >
            <span>Practice All ({allWordsCount})</span>
          </button>
        </div>

        <button
          className="btn btn-secondary"
          style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem', minHeight: '28px' }}
          onClick={restartSession}
          title="Reshuffle & Restart"
        >
          <RotateCcw size={12} />
          <span>Reshuffle</span>
        </button>
      </div>

      {/* Header with Progress Bar */}
      <div className="revision-header">
        <button
          className="icon-btn"
          onClick={() => onNavigate('dashboard')}
          title="Exit Revision Session"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          {currentIndex + 1} / {totalSessionWords}
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
              <Volume2 size={16} />
            </button>
          </div>

          {/* Phonetic & Part of Speech */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.15rem' }}>
            {currentMCQ.phonetic && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
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
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      [{idx + 1}]
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback & Detail Reveal */}
          {isAnswerRevealed && (
            <div className="feedback-box animate-fade-in">
              <div className="feedback-title">
                {isSelectedCorrect ? (
                  <>
                    <CheckCircle2 size={18} color="var(--text-primary)" />
                    <span style={{ color: 'var(--text-primary)' }}>Correct</span>
                  </>
                ) : (
                  <>
                    <XCircle size={18} color="var(--text-muted)" />
                    <span style={{ color: 'var(--text-muted)' }}>Incorrect</span>
                  </>
                )}
              </div>

              {/* Detailed Explanation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.65rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>Meaning: </strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {currentMCQ.detailedMeaning || currentMCQ.correctMeaning}
                  </span>
                </div>

                {currentMCQ.exampleSentence && (
                  <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.85rem', borderLeft: '2px solid var(--border-hover)', paddingLeft: '0.5rem' }}>
                    "{currentMCQ.exampleSentence}"
                  </div>
                )}

                {currentMCQ.memoryTip && (
                  <div style={{ background: 'var(--bg-surface-high)', border: '1px solid var(--border-subtle)', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-xs)', color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                    <strong>Memory aid:</strong> {currentMCQ.memoryTip}
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
