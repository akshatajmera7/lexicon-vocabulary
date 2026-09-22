import React from 'react';
import { BookOpen, Compass, PlusCircle, Sparkles } from 'lucide-react';
import { NavTab } from './Navbar';

interface MobileTabBarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  dueCount: number;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  activeTab,
  setActiveTab,
  dueCount,
}) => {
  return (
    <nav
      className="mobile-tab-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        background: 'var(--bg-surface-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0.45rem 0.5rem env(safe-area-inset-bottom, 0.45rem)',
      }}
    >
      <button
        onClick={() => setActiveTab('dashboard')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          background: 'transparent',
          border: 'none',
          color: activeTab === 'dashboard' ? 'var(--text-primary)' : 'var(--text-muted)',
          cursor: 'pointer',
          padding: '0.35rem 0.5rem',
          borderRadius: 'var(--radius-xs)',
          fontSize: '0.7rem',
          fontWeight: 600,
          transition: 'color 0.15s ease',
        }}
      >
        <Compass size={20} />
        <span>Home</span>
      </button>

      <button
        onClick={() => setActiveTab('add')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          background: 'transparent',
          border: 'none',
          color: activeTab === 'add' ? 'var(--text-primary)' : 'var(--text-muted)',
          cursor: 'pointer',
          padding: '0.35rem 0.5rem',
          borderRadius: 'var(--radius-xs)',
          fontSize: '0.7rem',
          fontWeight: 600,
          transition: 'color 0.15s ease',
        }}
      >
        <PlusCircle size={20} />
        <span>Add</span>
      </button>

      <button
        onClick={() => setActiveTab('revise')}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          background: 'transparent',
          border: 'none',
          color: activeTab === 'revise' ? 'var(--text-primary)' : 'var(--text-muted)',
          cursor: 'pointer',
          padding: '0.35rem 0.5rem',
          borderRadius: 'var(--radius-xs)',
          fontSize: '0.7rem',
          fontWeight: 600,
          transition: 'color 0.15s ease',
        }}
      >
        <BookOpen size={20} />
        <span>Revise</span>
        {dueCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '8px',
              background: 'var(--text-primary)',
              color: 'var(--bg-canvas)',
              borderRadius: 'var(--radius-xs)',
              padding: '0.05rem 0.3rem',
              fontSize: '0.625rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {dueCount}
          </span>
        )}
      </button>

      <button
        onClick={() => setActiveTab('library')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          background: 'transparent',
          border: 'none',
          color: activeTab === 'library' ? 'var(--text-primary)' : 'var(--text-muted)',
          cursor: 'pointer',
          padding: '0.35rem 0.5rem',
          borderRadius: 'var(--radius-xs)',
          fontSize: '0.7rem',
          fontWeight: 600,
          transition: 'color 0.15s ease',
        }}
      >
        <Sparkles size={20} />
        <span>Library</span>
      </button>
    </nav>
  );
};
