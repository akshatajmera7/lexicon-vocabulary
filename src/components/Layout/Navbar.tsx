import React from 'react';
import { BookOpen, Compass, Moon, PlusCircle, Settings, Sun } from 'lucide-react';

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
            <BookOpen size={22} />
          </div>
          <span>Lexicon</span>
        </div>

        {/* Center Nav Links */}
        <nav className="nav-links">
          <button
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Compass size={17} />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <PlusCircle size={17} />
            <span>Add Words</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'revise' ? 'active' : ''}`}
            onClick={() => setActiveTab('revise')}
          >
            <BookOpen size={17} />
            <span>Revise</span>
            {dueCount > 0 && (
              <span
                style={{
                  background: '#ef4444',
                  color: 'white',
                  borderRadius: '999px',
                  padding: '0.1rem 0.45rem',
                  fontSize: '0.7rem',
                  fontWeight: 800,
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
            <span className="streak-flame-icon">🔥</span>
            <span>{currentStreak} day{currentStreak === 1 ? '' : 's'}</span>
          </div>

          {/* Theme Switcher */}
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Settings */}
          <button
            className="icon-btn"
            onClick={onOpenSettings}
            title="Settings & API Keys"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
