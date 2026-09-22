import React from 'react';
import { ArrowRight, BookCheck, BookOpen, CheckCircle2, Clock, PlusCircle, Sparkles, Volume2 } from 'lucide-react';
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
          <div className="streak-hero-icon streak-flame-icon">🔥</div>
          <div>
            <h2 className="streak-hero-title">
              {currentStreak} Day Learning Streak
            </h2>
            <p className="streak-hero-subtitle">
              {currentStreak > 0
                ? `You're on a roll! Best record: ${longestStreak} days. Keep your daily memory momentum alive.`
                : 'Complete a revision session or add a new word today to start your streak!'}
            </p>
          </div>
        </div>

        <div
          style={{
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>
            Best
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {longestStreak}d
          </div>
        </div>
      </div>

      {/* Main Dual Action Hero CTAs */}
      <div className="hero-actions-row">
        {/* Revise Due Words */}
        <div
          className={`hero-action-card ${dueCount > 0 ? 'primary' : 'secondary'}`}
          onClick={() => onNavigate('revise')}
        >
          {dueCount > 0 && <div className="hero-badge-due">{dueCount} Due</div>}

          <div>
            <div className="hero-icon-wrap">
              <BookOpen size={24} />
            </div>
            <h3 className="hero-title">📚 Revise Words</h3>
            <p className="hero-desc">
              {dueCount > 0
                ? `${dueCount} word${dueCount === 1 ? '' : 's'} scheduled for spaced repetition revision right now.`
                : nextUpcomingReviewText
                ? `You're all caught up! Next revision ${nextUpcomingReviewText}.`
                : "You're all caught up! No words currently due."}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '0.925rem', marginTop: '1rem' }}>
            <span>{dueCount > 0 ? 'Start Revision Session' : 'Check Revision Queue'}</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Add New Words */}
        <div
          className="hero-action-card secondary"
          onClick={() => onNavigate('add')}
        >
          <div>
            <div className="hero-icon-wrap">
              <PlusCircle size={24} />
            </div>
            <h3 className="hero-title">+ Add New Words</h3>
            <p className="hero-desc">
              Paste interesting words. Definitions, phonetic pronunciation, examples, and memory aids are fetched automatically.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '0.925rem', color: 'var(--accent-amber)', marginTop: '1rem' }}>
            <span>Add to Vocabulary</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>Total</span>
            <BookCheck size={16} color="var(--accent-amber)" />
          </div>
          <div className="stat-value">{stats.totalWords}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Learning</span>
            <Clock size={16} color="var(--accent-amber)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-amber-light)' }}>
            {stats.learningCount}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Learned</span>
            <CheckCircle2 size={16} color="var(--accent-emerald)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-emerald)' }}>
            {stats.learnedCount}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Today</span>
            <Sparkles size={16} color="var(--accent-indigo)" />
          </div>
          <div className="stat-value" style={{ color: '#818cf8' }}>
            {stats.todayAddedCount}
          </div>
        </div>
      </div>

      {/* Today's Words Section */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.15rem' }}>Today's Vocabulary ({todayWords.length})</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Words added during today's session
            </p>
          </div>
          {todayWords.length > 0 && (
            <button
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', minHeight: '34px' }}
              onClick={() => onNavigate('library')}
            >
              View All
            </button>
          )}
        </div>

        {todayWords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.75rem 1rem', color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '0.85rem', fontSize: '0.9rem' }}>
              No words added yet today. Collect interesting terms to build your vault!
            </p>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', minHeight: '40px', fontSize: '0.875rem' }} onClick={() => onNavigate('add')}>
              <PlusCircle size={15} />
              <span>Add Word</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {todayWords.map((w) => (
              <div
                key={w.id}
                style={{
                  background: 'var(--bg-surface-2)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => onSelectWord(w)}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1, paddingRight: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{w.word}</span>
                    {w.part_of_speech && <span className="badge badge-pos">{w.part_of_speech}</span>}
                    {w.progress && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        • {formatInterval(w.progress.interval_days)}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
                    {w.simple_meaning}
                  </p>
                </div>

                <button
                  className="speaker-btn"
                  style={{ width: '32px', height: '32px', flexShrink: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord(w.word);
                  }}
                  title="Pronounce"
                >
                  <Volume2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
