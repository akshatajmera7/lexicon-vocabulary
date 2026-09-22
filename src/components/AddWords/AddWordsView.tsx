import React, { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle, Clock, Loader2, Plus, Sparkles, Volume2 } from 'lucide-react';
import { BatchWordItem, WordWithProgress } from '../../types/database';
import { speakWord } from '../../utils/audioHelper';
import { parseMultiWordInput } from '../../utils/wordNormalizer';

interface AddWordsViewProps {
  onAddBatch: (rawInput: string, onProgress: (item: BatchWordItem) => void) => Promise<BatchWordItem[]>;
  onWordAddedNavToLibrary: () => void;
  onSelectWord: (word: WordWithProgress) => void;
}

export const AddWordsView: React.FC<AddWordsViewProps> = ({
  onAddBatch,
  onWordAddedNavToLibrary,
  onSelectWord,
}) => {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [batchItems, setBatchItems] = useState<BatchWordItem[]>([]);
  const [completedResults, setCompletedResults] = useState<WordWithProgress[]>([]);

  const handleQuickInsert = (words: string) => {
    setInputText((prev) => (prev.trim() ? `${prev}\n${words}` : words));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tokens = parseMultiWordInput(inputText);
    if (tokens.length === 0 || isProcessing) return;

    setIsProcessing(true);
    setCompletedResults([]);

    // Initialize UI batch state
    const initialItems: BatchWordItem[] = tokens.map((w, idx) => ({
      id: `item-${idx}`,
      rawInput: w,
      normalizedWord: w,
      status: 'pending',
    }));
    setBatchItems(initialItems);

    try {
      const addedItems = await onAddBatch(inputText, (updatedItem) => {
        setBatchItems((prev) => {
          const idx = prev.findIndex((p) => p.normalizedWord === updatedItem.normalizedWord);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = updatedItem;
            return next;
          }
          return [...prev, updatedItem];
        });
      });

      const successfulWords: WordWithProgress[] = addedItems
        .filter((i) => i.status === 'done' && i.result)
        .map((i) => i.result as WordWithProgress);

      setCompletedResults(successfulWords);
      if (successfulWords.length > 0) {
        setInputText('');
      }
    } catch (err) {
      console.error('Batch add failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const parsedTokensCount = parseMultiWordInput(inputText).length;
  const doneCount = batchItems.filter((i) => i.status === 'done').length;
  const duplicateCount = batchItems.filter((i) => i.status === 'duplicate').length;
  const errorCount = batchItems.filter((i) => i.status === 'error').length;

  return (
    <div className="add-words-container animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.35rem' }}>+ Add New Words</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Paste one or multiple words. We will automatically retrieve definitions, examples, and memory aids.
        </p>
      </div>

      {/* Input Card */}
      <div className="glass-card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <textarea
              className="word-textarea"
              placeholder={`Enter words separated by new lines or commas, e.g.:

ephemeral
pragmatic
ubiquitous
tenacious`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isProcessing}
              autoFocus
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>
                {parsedTokensCount > 0 ? (
                  <strong style={{ color: 'var(--accent-primary)' }}>{parsedTokensCount} word{parsedTokensCount === 1 ? '' : 's'} detected</strong>
                ) : (
                  'Supports comma-separated or one word per line'
                )}
              </span>

              {/* Sample Quick Insert Pills */}
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem' }}>Sample:</span>
                <button
                  type="button"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleQuickInsert('meticulous, eloquent, resilient')}
                >
                  meticulous, eloquent, resilient
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
            {inputText.trim() && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setInputText('')}
                disabled={isProcessing}
              >
                Clear
              </button>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isProcessing || parsedTokensCount === 0}
              style={{ minWidth: '170px' }}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="status-icon-proc" />
                  <span>Enriching Words...</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>Add {parsedTokensCount > 1 ? `${parsedTokensCount} Words` : 'Word'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Batch Processing Status Card */}
      {batchItems.length > 0 && (
        <div className="batch-progress-card animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>
              {isProcessing ? 'Processing Queue...' : 'Batch Results'}
            </h3>

            {!isProcessing && (
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem' }}>
                {doneCount > 0 && (
                  <span style={{ color: 'var(--success)', fontWeight: 600 }}>
                    ✓ {doneCount} added
                  </span>
                )}
                {duplicateCount > 0 && (
                  <span style={{ color: 'var(--warning)', fontWeight: 600 }}>
                    ⚠ {duplicateCount} already existed
                  </span>
                )}
                {errorCount > 0 && (
                  <span style={{ color: 'var(--danger)', fontWeight: 600 }}>
                    ❌ {errorCount} failed
                  </span>
                )}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {batchItems.map((item) => (
              <div key={item.id} className="batch-item-row">
                <div className="batch-item-left">
                  {item.status === 'processing' && <Loader2 size={18} className="status-icon-proc" />}
                  {item.status === 'done' && <CheckCircle size={18} className="status-icon-done" />}
                  {item.status === 'duplicate' && <AlertCircle size={18} className="status-icon-duplicate" />}
                  {item.status === 'error' && <AlertCircle size={18} className="status-icon-error" />}
                  {item.status === 'pending' && <Clock size={18} color="var(--text-muted)" />}

                  <span style={{ textTransform: 'capitalize' }}>{item.rawInput}</span>
                </div>

                <div style={{ fontSize: '0.85rem' }}>
                  {item.status === 'processing' && <span style={{ color: 'var(--accent-primary)' }}>Looking up meaning...</span>}
                  {item.status === 'done' && <span style={{ color: 'var(--success)' }}>Added to vocabulary</span>}
                  {item.status === 'duplicate' && <span style={{ color: 'var(--warning)' }}>Already in your vocabulary</span>}
                  {item.status === 'error' && <span style={{ color: 'var(--danger)' }}>{item.error || 'Failed'}</span>}
                  {item.status === 'pending' && <span style={{ color: 'var(--text-muted)' }}>Waiting...</span>}
                </div>
              </div>
            ))}
          </div>

          {!isProcessing && completedResults.length > 0 && (
            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={onWordAddedNavToLibrary}>
                <span>View in Library</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Live Preview of Newly Added Word Cards */}
      {completedResults.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="var(--accent-primary)" />
            <span>Enriched Vocabulary Previews</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {completedResults.map((w) => (
              <div
                key={w.id}
                className="glass-card"
                style={{ padding: '1.25rem', cursor: 'pointer' }}
                onClick={() => onSelectWord(w)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.25rem' }}>{w.word}</h4>
                    {w.part_of_speech && <span className="badge badge-pos">{w.part_of_speech}</span>}
                  </div>
                  <button
                    className="speaker-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(w.word);
                    }}
                    title="Pronounce"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  {w.simple_meaning}
                </p>

                {w.example_sentence && (
                  <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-muted)', borderLeft: '2px solid var(--accent-primary)', paddingLeft: '0.5rem' }}>
                    "{w.example_sentence}"
                  </p>
                )}

                {w.memory_tip && (
                  <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', background: 'rgba(99, 102, 241, 0.08)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', color: '#818cf8' }}>
                    💡 <strong>Memory tip:</strong> {w.memory_tip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
