import React from 'react';
import { BookOpen, Compass, Flame, Moon, PlusCircle, Settings, Sun } from 'lucide-react';

export type NavTab = 'dashboard' | 'add' | 'revise' | 'library';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  dueCount: number;
  currentStreak: number;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  dueCount,
  currentStreak,
  theme,
  setTheme,
  onOpenSettings,
}) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="brand" onClick={() => setActiveTab('dashboard')}>
          <div className="brand-icon">
            <BookOpen size={16} />
          </div>
          <span>Lexicon</span>
        </div>

        {/* Center Nav Links */}
        <nav className="nav-links">
          <button
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Compass size={15} />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <PlusCircle size={15} />
            <span>Add Words</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'revise' ? 'active' : ''}`}
            onClick={() => setActiveTab('revise')}
          >
            <BookOpen size={15} />
            <span>Revise</span>
            {dueCount > 0 && (
              <span
                style={{
                  background: activeTab === 'revise' ? 'var(--bg-canvas)' : 'var(--text-primary)',
                  color: activeTab === 'revise' ? 'var(--text-primary)' : 'var(--bg-canvas)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.05rem 0.35rem',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  marginLeft: '0.2rem',
                }}
              >
                {dueCount}
              </span>
            )}
          </button>

          <button
            className={`nav-link ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            <span>Library</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Streak counter pill */}
          <div className="streak-pill" title="Daily Learning Streak">
            <Flame size={13} color="var(--text-primary)" />
            <span>{currentStreak}d</span>
          </div>

          {/* Theme Switcher */}
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Settings */}
          <button
            className="icon-btn"
            onClick={onOpenSettings}
            title="Settings & API Keys"
          >
            <Settings size={15} />
          </button>
        </div>
      </div>
    </header>
  );
};
