import React from 'react';
import {
  CheckCircle2,
  History,
  Lightbulb,
  Trash2,
  Volume2,
  X,
  XCircle,
} from 'lucide-react';
import { WordWithProgress } from '../../types/database';
import { speakWord } from '../../utils/audioHelper';
import { formatInterval } from '../../utils/spacedRepetition';

interface WordDetailModalProps {
  word: WordWithProgress | null;
  onClose: () => void;
  onDeleteRequest: (word: WordWithProgress) => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  word,
  onClose,
  onDeleteRequest,
}) => {
  if (!word) return null;

  const progress = word.progress;
  const history = word.review_history || [];

  const addedDate = new Date(word.created_at).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const nextReviewDate = progress
    ? new Date(progress.next_review_at).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Not scheduled';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h2 style={{ fontSize: '1.85rem' }}>{word.word}</h2>
            {word.part_of_speech && <span className="badge badge-pos">{word.part_of_speech}</span>}
            <button
              className="speaker-btn"
              onClick={() => speakWord(word.word)}
              title="Pronounce"
            >
              <Volume2 size={16} />
            </button>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Phonetic & Difficulty */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.25rem' }}>
          {word.phonetic && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {word.phonetic}
            </span>
          )}
          <span className={`badge badge-diff-${word.difficulty || 'medium'}`}>
            {word.difficulty || 'medium'}
          </span>
          {progress?.status && (
            <span className={`badge badge-${progress.status}`}>{progress.status}</span>
          )}
        </div>

        {/* Meanings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
              Simple Meaning
            </div>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 500 }}>
              {word.simple_meaning}
            </p>
          </div>

          {word.detailed_meaning && word.detailed_meaning !== word.simple_meaning && (
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
                Detailed Explanation
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {word.detailed_meaning}
              </p>
            </div>
          )}

          {word.example_sentence && (
            <div style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--accent-primary)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
                Example Usage
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                "{word.example_sentence}"
              </p>
            </div>
          )}

          {/* Synonyms & Antonyms */}
          {((word.synonyms && word.synonyms.length > 0) || (word.antonyms && word.antonyms.length > 0)) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {word.synonyms && word.synonyms.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Synonyms
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {word.synonyms.map((s) => (
                      <span key={s} style={{ background: 'rgba(255, 255, 255, 0.06)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {word.antonyms && word.antonyms.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Antonyms
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {word.antonyms.map((a) => (
                      <span key={a} style={{ background: 'rgba(239, 68, 68, 0.08)', color: '#f87171', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Memory Tip */}
          {word.memory_tip && (
            <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', color: '#818cf8', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                <Lightbulb size={16} />
                <span>Memory Tip</span>
              </div>
              <p>{word.memory_tip}</p>
            </div>
          )}
        </div>

        {/* Learning & Spaced Repetition Stats */}
        <div style={{ background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
            Spaced Repetition Stats
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interval</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {formatInterval(progress?.interval_days || 0)}
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Repetitions</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{progress?.repetition_count || 0}</div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ease Factor</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {(progress?.ease_factor || 2.5).toFixed(2)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Added:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{addedDate}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Next Review:</span>
              <strong style={{ color: 'var(--accent-primary)' }}>{nextReviewDate}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Reviews:</span>
              <span>
                <strong style={{ color: 'var(--success)' }}>{progress?.correct_count || 0} correct</strong>,{' '}
                <strong style={{ color: 'var(--danger)' }}>{progress?.incorrect_count || 0} incorrect</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Review History Timeline */}
        {history.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <History size={14} />
              <span>Review History ({history.length})</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '160px', overflowY: 'auto' }}>
              {history.map((h) => {
                const dateStr = new Date(h.reviewed_at).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                });
                return (
                  <div
                    key={h.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.75rem',
                      background: 'rgba(0, 0, 0, 0.15)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.825rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {h.was_correct ? (
                        <CheckCircle2 size={14} color="var(--success)" />
                      ) : (
                        <XCircle size={14} color="var(--danger)" />
                      )}
                      <span>{dateStr}</span>
                      <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>({h.rating})</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)' }}>
                      Interval: {h.previous_interval}d → {h.new_interval}d
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
          <button
            className="btn btn-secondary"
            style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
            onClick={() => onDeleteRequest(word)}
          >
            <Trash2 size={16} />
            <span>Delete Word</span>
          </button>

          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
