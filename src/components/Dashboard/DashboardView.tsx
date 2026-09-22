import React from 'react';
import { ArrowRight, BookCheck, BookOpen, CheckCircle2, Clock, Flame, PlusCircle, Sparkles, Volume2 } from 'lucide-react';
import { VocabularyStats, WordWithProgress } from '../../types/database';
import { speakWord } from '../../utils/audioHelper';
import { formatInterval } from '../../utils/spacedRepetition';
import { NavTab } from '../Layout/Navbar';

interface DashboardViewProps {
  stats: VocabularyStats;
  currentStreak: number;
  longestStreak: number;
  dueCount: number;
  todayWords: WordWithProgress[];
  nextUpcomingReviewText: string | null;
  onNavigate: (tab: NavTab) => void;
  onSelectWord: (word: WordWithProgress) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  currentStreak,
  longestStreak,
  dueCount,
  todayWords,
  nextUpcomingReviewText,
  onNavigate,
  onSelectWord,
}) => {
  return (
    <div className="dashboard-grid animate-fade-in">
      {/* Streak Hero Banner */}
      <div className="streak-hero-banner">
        <div className="streak-hero-left">
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: 'var(--bg-surface-high)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={18} color="var(--text-primary)" />
          </div>
          <div>
            <h2 className="streak-hero-title">
              {currentStreak} Day Learning Streak
            </h2>
            <p className="streak-hero-subtitle">
              {currentStreak > 0
                ? `Best record: ${longestStreak} days. Keep your daily memory momentum active.`
                : 'Complete a revision session or add a new word today to start your streak.'}
            </p>
          </div>
        </div>

        <div
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--bg-surface-high)',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
            flexShrink: 0,
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Best
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {longestStreak}d
          </div>
        </div>
      </div>

      {/* Main Dual Action Hero CTAs */}
      <div className="hero-actions-row">
        {/* Revise Due Words */}
        <div
          className="hero-action-card primary"
          onClick={() => onNavigate('revise')}
        >
          {dueCount > 0 && <div className="hero-badge-due">{dueCount} Due</div>}

          <div>
            <div className="hero-icon-wrap">
              <BookOpen size={20} />
            </div>
            <h3 className="hero-title">Revise Words</h3>
            <p className="hero-desc">
              {dueCount > 0
                ? `${dueCount} word${dueCount === 1 ? '' : 's'} scheduled for spaced repetition revision right now.`
                : nextUpcomingReviewText
                ? `You're all caught up. Next revision ${nextUpcomingReviewText}.`
                : "You're all caught up. No words currently due."}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, fontSize: '0.85rem', marginTop: '1rem', color: 'var(--text-primary)' }}>
            <span>{dueCount > 0 ? 'Start Revision Session' : 'Check Revision Queue'}</span>
            <ArrowRight size={15} />
          </div>
        </div>

        {/* Add New Words */}
        <div
          className="hero-action-card secondary"
          onClick={() => onNavigate('add')}
        >
          <div>
            <div className="hero-icon-wrap">
              <PlusCircle size={20} />
            </div>
            <h3 className="hero-title">+ Add New Words</h3>
            <p className="hero-desc">
              Paste single or multiple words. Definitions, phonetic pronunciation, and examples are fetched automatically.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '1rem' }}>
            <span>Add to Vocabulary</span>
            <ArrowRight size={15} />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>Total</span>
            <BookCheck size={14} color="var(--text-secondary)" />
          </div>
          <div className="stat-value">{stats.totalWords}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Learning</span>
            <Clock size={14} color="var(--text-secondary)" />
          </div>
          <div className="stat-value">{stats.learningCount}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Learned</span>
            <CheckCircle2 size={14} color="var(--text-secondary)" />
          </div>
          <div className="stat-value">{stats.learnedCount}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Today</span>
            <Sparkles size={14} color="var(--text-secondary)" />
          </div>
          <div className="stat-value">{stats.todayAddedCount}</div>
        </div>
      </div>

      {/* Today's Words Section */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.1rem' }}>Today's Vocabulary ({todayWords.length})</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Words added during today's session
            </p>
          </div>
          {todayWords.length > 0 && (
            <button
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', minHeight: '30px' }}
              onClick={() => onNavigate('library')}
            >
              View All
            </button>
          )}
        </div>

        {todayWords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>
              No words added yet today. Collect interesting terms to expand your vocabulary.
            </p>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.85rem', minHeight: '34px', fontSize: '0.8rem' }} onClick={() => onNavigate('add')}>
              <PlusCircle size={14} />
              <span>Add Word</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {todayWords.map((w) => (
              <div
                key={w.id}
                style={{
                  background: 'var(--bg-surface-low)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.75rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease',
                }}
                onClick={() => onSelectWord(w)}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', flex: 1, paddingRight: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{w.word}</span>
                    {w.part_of_speech && <span className="badge badge-pos">{w.part_of_speech}</span>}
                    {w.progress && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        • {formatInterval(w.progress.interval_days)}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
                    {w.simple_meaning}
                  </p>
                </div>

                <button
                  className="speaker-btn"
                  style={{ width: '28px', height: '28px', flexShrink: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord(w.word);
                  }}
                  title="Pronounce"
                >
                  <Volume2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
