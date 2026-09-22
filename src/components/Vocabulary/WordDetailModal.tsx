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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {word.synonyms && word.synonyms.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                    Synonyms
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {word.synonyms.map((s) => (
                      <span key={s} style={{ background: 'var(--bg-surface-low)', border: '1px solid var(--border-subtle)', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-xs)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {word.antonyms && word.antonyms.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                    Antonyms
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {word.antonyms.map((a) => (
                      <span key={a} style={{ background: 'var(--bg-surface-low)', border: '1px solid var(--border-subtle)', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-xs)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
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
            <div style={{ background: 'var(--bg-surface-high)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', padding: '0.75rem 0.85rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.2rem', color: 'var(--text-primary)' }}>
                <Lightbulb size={14} />
                <span>Memory Tip</span>
              </div>
              <p>{word.memory_tip}</p>
            </div>
          )}
        </div>

        {/* Learning & Spaced Repetition Stats */}
        <div style={{ background: 'var(--bg-surface-low)', borderRadius: 'var(--radius-xs)', padding: '1.15rem', marginBottom: '1.25rem', border: '1px solid var(--border-subtle)' }}>
          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.04em', fontFamily: 'var(--font-mono)' }}>
            Spaced Repetition Stats
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center', marginBottom: '0.85rem' }}>
            <div style={{ background: 'var(--bg-surface-high)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Interval</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {formatInterval(progress?.interval_days || 0)}
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface-high)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Reps</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{progress?.repetition_count || 0}</div>
            </div>

            <div style={{ background: 'var(--bg-surface-high)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Factor</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {(progress?.ease_factor || 2.5).toFixed(2)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Added:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{addedDate}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Next Review:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{nextReviewDate}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Reviews:</span>
              <span>
                <strong style={{ color: 'var(--text-primary)' }}>{progress?.correct_count || 0} correct</strong>,{' '}
                <strong style={{ color: 'var(--text-muted)' }}>{progress?.incorrect_count || 0} incorrect</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Review History Timeline */}
        {history.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)' }}>
              <History size={13} />
              <span>Review History ({history.length})</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '140px', overflowY: 'auto' }}>
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
                      padding: '0.45rem 0.65rem',
                      background: 'var(--bg-surface-low)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.8rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      {h.was_correct ? (
                        <CheckCircle2 size={14} color="var(--text-primary)" />
                      ) : (
                        <XCircle size={14} color="var(--text-muted)" />
                      )}
                      <span>{dateStr}</span>
                      <span style={{ textTransform: 'capitalize', fontWeight: 600, color: 'var(--text-secondary)' }}>({h.rating})</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                      {h.previous_interval}d → {h.new_interval}d
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => onDeleteRequest(word)}
          >
            <Trash2 size={15} />
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
