import React from 'react';
import { ArrowRight, BookCheck, BookOpen, CheckCircle2, Clock, PlusCircle, Sparkles, Volume2 } from 'lucide-react';
import { VocabularyStats, WordWithProgress } from '../../types/database';
import { speakWord } from '../../utils/audioHelper';
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
                ? `You're on a roll! Best record: ${longestStreak} days. Revise due words or add new ones to keep it alive.`
                : 'Complete a revision session or add a word today to start your streak!'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div
            style={{
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0, 0, 0, 0.25)',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Longest
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {longestStreak} <span style={{ fontSize: '0.85rem' }}>days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Actions: Add Words & Revise Due Words */}
      <div className="hero-actions-row">
        {/* Revise Words Card */}
        <div
          className={`hero-action-card ${dueCount > 0 ? 'primary' : 'secondary'}`}
          onClick={() => onNavigate('revise')}
        >
          {dueCount > 0 && <div className="hero-badge-due">{dueCount} Due</div>}

          <div>
            <div className="hero-icon-wrap">
              <BookOpen size={28} />
            </div>
            <h3 className="hero-title">📚 Revise Words</h3>
            <p className="hero-desc">
              {dueCount > 0
                ? `${dueCount} word${dueCount === 1 ? '' : 's'} scheduled for spaced repetition revision today.`
                : nextUpcomingReviewText
                ? `You're all caught up! Next revision ${nextUpcomingReviewText}.`
                : "You're all caught up! No words currently due for revision."}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', marginTop: '1rem' }}>
            <span>{dueCount > 0 ? 'Start Revision Session' : 'Check Revision Queue'}</span>
            <ArrowRight size={18} />
          </div>
        </div>

        {/* Add New Words Card */}
        <div
          className="hero-action-card secondary"
          onClick={() => onNavigate('add')}
        >
          <div>
            <div className="hero-icon-wrap">
              <PlusCircle size={28} />
            </div>
            <h3 className="hero-title">+ Add New Words</h3>
            <p className="hero-desc">
              Paste single or multiple words. Meanings, examples, and memory aids are fetched automatically.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-primary)', marginTop: '1rem' }}>
            <span>Add to Vocabulary</span>
            <ArrowRight size={18} />
          </div>
        </div>
      </div>

      {/* Vocabulary Statistics Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>Total Words</span>
            <BookCheck size={18} color="var(--accent-primary)" />
          </div>
          <div className="stat-value">{stats.totalWords}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Words Learning</span>
            <Clock size={18} color="var(--warning)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>
            {stats.learningCount}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Words Learned</span>
            <CheckCircle2 size={18} color="var(--success)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>
            {stats.learnedCount}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Added Today</span>
            <Sparkles size={18} color="var(--info)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--info)' }}>
            {stats.todayAddedCount}
          </div>
        </div>
      </div>

      {/* Today's Added Words Preview */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Today's Vocabulary ({todayWords.length})</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Words collected during today's session
            </p>
          </div>
          {todayWords.length > 0 && (
            <button
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
              onClick={() => onNavigate('library')}
            >
              View All in Library
            </button>
          )}
        </div>

        {todayWords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
              No words added yet today. Collect interesting words from articles, books, or podcasts!
            </p>
            <button className="btn btn-primary" onClick={() => onNavigate('add')}>
              <PlusCircle size={16} />
              <span>Add First Word Today</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {todayWords.map((w) => (
              <div
                key={w.id}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => onSelectWord(w)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{w.word}</span>
                    {w.part_of_speech && <span className="badge badge-pos">{w.part_of_speech}</span>}
                  </div>
                  <button
                    className="speaker-btn"
                    style={{ width: '28px', height: '28px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(w.word);
                    }}
                    title="Pronounce"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {w.simple_meaning}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
