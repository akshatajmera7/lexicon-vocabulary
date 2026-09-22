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
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0.5rem 0.75rem env(safe-area-inset-bottom, 0.5rem)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
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
          color: activeTab === 'dashboard' ? 'var(--accent-primary)' : 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '0.4rem 0.6rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.725rem',
          fontWeight: 700,
          transition: 'all 0.2s ease',
        }}
      >
        <Compass size={22} />
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
          color: activeTab === 'add' ? 'var(--accent-primary)' : 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '0.4rem 0.6rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.725rem',
          fontWeight: 700,
          transition: 'all 0.2s ease',
        }}
      >
        <PlusCircle size={22} />
        <span>Add Words</span>
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
          color: activeTab === 'revise' ? 'var(--accent-primary)' : 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '0.4rem 0.6rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.725rem',
          fontWeight: 700,
          transition: 'all 0.2s ease',
        }}
      >
        <BookOpen size={22} />
        <span>Revise</span>
        {dueCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '8px',
              background: '#ef4444',
              color: 'white',
              borderRadius: '999px',
              padding: '0.05rem 0.35rem',
              fontSize: '0.65rem',
              fontWeight: 800,
              boxShadow: '0 2px 6px rgba(239, 68, 68, 0.6)',
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
          color: activeTab === 'library' ? 'var(--accent-primary)' : 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '0.4rem 0.6rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.725rem',
          fontWeight: 700,
          transition: 'all 0.2s ease',
        }}
      >
        <Sparkles size={22} />
        <span>Library</span>
      </button>
    </nav>
  );
};
