import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { WordWithProgress } from '../../types/database';

interface DeleteConfirmModalProps {
  word: WordWithProgress | null;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  word,
  onCancel,
  onConfirm,
  isDeleting,
}) => {
  if (!word) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-content animate-fade-in"
        style={{ maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--danger)' }}>
          <AlertTriangle size={26} />
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Delete Word?</h3>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>"{word.word}"</strong> from your vocabulary? This will permanently erase its learning progress and review history.
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Word'}
          </button>
        </div>
      </div>
    </div>
  );
};
