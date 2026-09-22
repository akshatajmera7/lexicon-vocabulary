import { useEffect, useState } from 'react';
import { WordWithProgress } from './types/database';
import { useStreak } from './hooks/useStreak';
import { useVocabulary } from './hooks/useVocabulary';
import { RevisionService } from './services/revisionService';
import { MobileTabBar } from './components/Layout/MobileTabBar';
import { Navbar, NavTab } from './components/Layout/Navbar';
import { AddWordsView } from './components/AddWords/AddWordsView';
import { DashboardView } from './components/Dashboard/DashboardView';
import { RevisionView } from './components/Revision/RevisionView';
import { SettingsModal } from './components/Settings/SettingsModal';
import { VocabularyView } from './components/Vocabulary/VocabularyView';
import { WordDetailModal } from './components/Vocabulary/WordDetailModal';
import './styles/index.css';
import './styles/components.css';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<WordWithProgress | null>(null);
  const [nextReviewText, setNextReviewText] = useState<string | null>(null);

  const vocabularyHook = useVocabulary();
  const { currentStreak, longestStreak, refreshStreak } = useStreak();

  // Apply data-theme to HTML tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Load next upcoming review info
  const loadNextReviewInfo = async () => {
    try {
      const upcoming = await RevisionService.getNextUpcomingReview();
      if (upcoming?.nextReviewAt) {
        const d = new Date(upcoming.nextReviewAt);
        const isTomorrow =
          d.getDate() === new Date(Date.now() + 24 * 60 * 60 * 1000).getDate();
        const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setNextReviewText(
          `${isTomorrow ? 'tomorrow' : `on ${d.toLocaleDateString()}`} around ${timeStr}`
        );
      } else {
        setNextReviewText(null);
      }
    } catch (e) {
      console.warn('Failed to load upcoming review text:', e);
    }
  };

  useEffect(() => {
    loadNextReviewInfo();
  }, [vocabularyHook.words]);

  const handleRefreshAll = () => {
    vocabularyHook.refresh();
    refreshStreak();
    loadNextReviewInfo();
  };

  // Extract words added today
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayWords = vocabularyHook.words.filter(
    (w) => w.created_at && w.created_at.slice(0, 10) === todayStr
  );

  return (
    <div className="app-root" style={{ paddingBottom: '5.5rem' }}>
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dueCount={vocabularyHook.stats.dueCount}
        currentStreak={currentStreak}
        theme={theme}
        setTheme={setTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="app-container">
        {activeTab === 'dashboard' && (
          <DashboardView
            stats={vocabularyHook.stats}
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            dueCount={vocabularyHook.stats.dueCount}
            todayWords={todayWords}
            nextUpcomingReviewText={nextReviewText}
            onNavigate={setActiveTab}
            onSelectWord={setSelectedWord}
          />
        )}

        {activeTab === 'add' && (
          <AddWordsView
            onAddBatch={vocabularyHook.addWordsBatch}
            onWordAddedNavToLibrary={() => {
              vocabularyHook.refresh();
              refreshStreak();
              setActiveTab('library');
            }}
            onSelectWord={setSelectedWord}
          />
        )}

        {activeTab === 'revise' && (
          <RevisionView
            onNavigate={(tab) => {
              handleRefreshAll();
              setActiveTab(tab);
            }}
            onSelectWord={setSelectedWord}
          />
        )}

        {activeTab === 'library' && (
          <VocabularyView
            vocabularyHook={vocabularyHook}
            onNavigate={setActiveTab}
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
          />
        )}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (activeTab === 'revise' && tab !== 'revise') {
            handleRefreshAll();
          }
          setActiveTab(tab);
        }}
        dueCount={vocabularyHook.stats.dueCount}
      />

      {/* Global Word Details Modal (e.g. from Dashboard or AddWords) */}
      {selectedWord && (
        <WordDetailModal
          word={selectedWord}
          onClose={() => setSelectedWord(null)}
          onDeleteRequest={async (word) => {
            if (window.confirm(`Delete "${word.word}" from your vocabulary?`)) {
              await vocabularyHook.deleteWord(word.id);
              setSelectedWord(null);
            }
          }}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onRefreshData={handleRefreshAll}
      />
    </div>
  );
}

export default App;
