import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  LayoutGrid,
  ListFilter,
  PlusCircle,
  Search,
  Volume2,
  X,
} from 'lucide-react';
import { WordWithProgress } from '../../types/database';
import { speakWord } from '../../utils/audioHelper';
import { isWordDue } from '../../utils/spacedRepetition';
import { SortOption, StatusFilter, useVocabulary } from '../../hooks/useVocabulary';
import { NavTab } from '../Layout/Navbar';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { WordDetailModal } from './WordDetailModal';

interface VocabularyViewProps {
  vocabularyHook: ReturnType<typeof useVocabulary>;
  onNavigate: (tab: NavTab) => void;
  selectedWord: WordWithProgress | null;
  setSelectedWord: (word: WordWithProgress | null) => void;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  vocabularyHook,
  onNavigate,
  selectedWord,
  setSelectedWord,
}) => {
  const {
    words,
    filteredWords,
    groupedByDate,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    deleteWord,
  } = vocabularyHook;

  const [viewMode, setViewMode] = useState<'grouped' | 'grid'>('grouped');
  const [wordToDelete, setWordToDelete] = useState<WordWithProgress | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!wordToDelete) return;
    setIsDeleting(true);
    try {
      await deleteWord(wordToDelete.id);
      if (selectedWord?.id === wordToDelete.id) {
        setSelectedWord(null);
      }
      setWordToDelete(null);
    } catch (err) {
      console.error('Failed to delete word:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderWordCard = (w: WordWithProgress) => {
    const isDue = isWordDue(w.progress);
    const nextReviewStr = w.progress
      ? new Date(w.progress.next_review_at).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        })
      : 'New';

    return (
      <div
        key={w.id}
        className="word-item-card"
        onClick={() => setSelectedWord(w)}
      >
        <div>
          <div className="word-card-top">
            <div className="word-heading">
              <span>{w.word}</span>
              {w.part_of_speech && <span className="badge badge-pos">{w.part_of_speech}</span>}
            </div>

            <button
              className="speaker-btn"
              style={{ width: '30px', height: '30px' }}
              onClick={(e) => {
                e.stopPropagation();
                speakWord(w.word);
              }}
              title="Pronounce"
            >
              <Volume2 size={15} />
            </button>
          </div>

          <p className="word-card-meaning" style={{ marginTop: '0.6rem' }}>
            {w.simple_meaning}
          </p>
        </div>

        <div className="word-card-footer">
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {isDue ? (
              <span className="badge badge-due">Due now</span>
            ) : w.progress?.status === 'learned' ? (
              <span className="badge badge-learned">Learned</span>
            ) : (
              <span className="badge badge-learning">Learning</span>
            )}

            <span className={`badge badge-diff-${w.difficulty || 'medium'}`}>
              {w.difficulty || 'medium'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={13} />
            <span>Review: {nextReviewStr}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Header Bar */}
      <div className="library-header">
        <div className="library-top-bar">
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>Vocabulary Library</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Your complete personal knowledge vault of {words.length} English words
            </p>
          </div>

          <button className="btn btn-primary" onClick={() => onNavigate('add')}>
            <PlusCircle size={17} />
            <span>Add Words</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="search-input-wrap">
          <Search size={18} className="search-input-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by word, meaning, synonym, or context..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters and Controls */}
        <div className="filters-row">
          {/* Status Tabs */}
          <div className="filter-tabs">
            {(['all', 'due', 'learning', 'learned'] as StatusFilter[]).map((tab) => (
              <button
                key={tab}
                className={`filter-tab ${statusFilter === tab ? 'active' : ''}`}
                onClick={() => setStatusFilter(tab)}
              >
                <span style={{ textTransform: 'capitalize' }}>{tab}</span>
              </button>
            ))}
          </div>

          {/* Sort & Grouping Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-input)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
              <ListFilter size={15} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                <option value="newest" style={{ background: '#1e293b' }}>Newest Added</option>
                <option value="alphabetical" style={{ background: '#1e293b' }}>Alphabetical (A-Z)</option>
                <option value="next_review" style={{ background: '#1e293b' }}>Next Review Date</option>
                <option value="difficulty" style={{ background: '#1e293b' }}>Difficulty Level</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="filter-tabs">
              <button
                className={`filter-tab ${viewMode === 'grouped' ? 'active' : ''}`}
                onClick={() => setViewMode('grouped')}
                title="Group by Date Added"
              >
                <Calendar size={15} />
              </button>
              <button
                className={`filter-tab ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Words Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          Loading your vocabulary...
        </div>
      ) : filteredWords.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No words match your filter</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            {searchQuery
              ? `No vocabulary matching "${searchQuery}". Try a different keyword.`
              : 'Add new words or adjust your filters to see vocabulary items.'}
          </p>
          {searchQuery && (
            <button className="btn btn-secondary" onClick={() => setSearchQuery('')}>
              Clear Search Query
            </button>
          )}
        </div>
      ) : viewMode === 'grouped' ? (
        // Date Grouped View (Today, Yesterday, Date)
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {groupedByDate.map((group) => (
            <div key={group.dateKey}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={16} color="var(--accent-primary)" />
                  <span>{group.label}</span>
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-input)', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                  {group.words.length} word{group.words.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="word-cards-grid">
                {group.words.map((w) => renderWordCard(w))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Flat Grid View
        <div className="word-cards-grid">
          {filteredWords.map((w) => renderWordCard(w))}
        </div>
      )}

      {/* Word Details Modal */}
      {selectedWord && (
        <WordDetailModal
          word={selectedWord}
          onClose={() => setSelectedWord(null)}
          onDeleteRequest={(word) => setWordToDelete(word)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {wordToDelete && (
        <DeleteConfirmModal
          word={wordToDelete}
          onCancel={() => setWordToDelete(null)}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};
