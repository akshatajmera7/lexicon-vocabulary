import React, { useState } from 'react';
import { Check, Database, Key, RefreshCw, Sparkles, X } from 'lucide-react';
import {
  FREE_OPENROUTER_MODELS,
  getStoredProviderOptions,
  ProviderOptions,
  saveStoredProviderOptions,
} from '../../services/providers';
import {
  getStoredSupabaseConfig,
  resetSupabaseClient,
  saveStoredSupabaseConfig,
  SupabaseConfig,
} from '../../services/supabaseClient';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onRefreshData,
}) => {
  if (!isOpen) return null;

  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>(getStoredSupabaseConfig());
  const [providerOptions, setProviderOptions] = useState<ProviderOptions>(getStoredProviderOptions());
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSupabaseConfig(supabaseConfig);
    saveStoredProviderOptions(providerOptions);
    resetSupabaseClient();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onRefreshData();
      onClose();
    }, 600);
  };

  const handleResetLocal = () => {
    if (window.confirm('Reset local vocabulary to default sample seed words?')) {
      localStorage.removeItem('lexicon_local_words_v1');
      localStorage.removeItem('lexicon_local_progress_v1');
      localStorage.removeItem('lexicon_local_history_v1');
      localStorage.removeItem('lexicon_local_activity_v1');
      localStorage.removeItem('lexicon_local_profile_v1');
      onRefreshData();
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Key size={20} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.4rem' }}>Settings & API Configuration</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* AI Providers Section */}
          <div style={{ background: 'var(--bg-surface-low)', padding: '1.15rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} color="var(--text-primary)" />
              <span>Vocabulary Enrichment & AI Providers</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Free Dictionary API works out of the box with zero setup. You can also connect OpenRouter (with free zero-cost models), Google Gemini, or custom LLMs.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                  Preferred Provider Mode
                </label>
                <select
                  value={providerOptions.preferredProvider || 'auto'}
                  onChange={(e) =>
                    setProviderOptions({
                      ...providerOptions,
                      preferredProvider: e.target.value as any,
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.825rem',
                  }}
                >
                  <option value="auto" style={{ background: '#121212' }}>Auto / Hybrid (Dictionary API + AI Enrichment)</option>
                  <option value="openrouter" style={{ background: '#121212' }}>OpenRouter AI (Free / Paid Models)</option>
                  <option value="gemini" style={{ background: '#121212' }}>Google Gemini AI</option>
                  <option value="openai" style={{ background: '#121212' }}>Custom OpenAI / Kimi LLM</option>
                  <option value="dictionary" style={{ background: '#121212' }}>Dictionary API Only (No AI)</option>
                </select>
              </div>

              {/* OpenRouter Configuration */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                  OpenRouter API Key (Optional — Free models available)
                </label>
                <input
                  type="password"
                  placeholder="sk-or-v1-..."
                  value={providerOptions.openrouterApiKey || ''}
                  onChange={(e) =>
                    setProviderOptions({ ...providerOptions, openrouterApiKey: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.825rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                  OpenRouter Model
                </label>
                <select
                  value={providerOptions.openrouterModel || 'google/gemini-2.0-flash-thinking-exp:free'}
                  onChange={(e) =>
                    setProviderOptions({
                      ...providerOptions,
                      openrouterModel: e.target.value,
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.825rem',
                  }}
                >
                  {FREE_OPENROUTER_MODELS.map((m) => (
                    <option key={m.id} value={m.id} style={{ background: '#121212' }}>
                      {m.name}
                    </option>
                  ))}
                  <option value="openai/gpt-4o-mini" style={{ background: '#121212' }}>OpenAI GPT-4o Mini</option>
                  <option value="anthropic/claude-3.5-haiku" style={{ background: '#121212' }}>Claude 3.5 Haiku</option>
                </select>
              </div>

              {/* Google Gemini */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                  Google Gemini API Key (Optional)
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={providerOptions.geminiApiKey || ''}
                  onChange={(e) =>
                    setProviderOptions({ ...providerOptions, geminiApiKey: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.825rem',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Supabase Connection */}
          <div style={{ background: 'var(--bg-surface-low)', padding: '1.15rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Database size={16} color="var(--text-primary)" />
              <span>Supabase Cloud Database</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Currently connected to PostgreSQL project with Row Level Security and active sync.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  placeholder="https://wmzxwofjvnpbdkwebqik.supabase.co"
                  value={supabaseConfig.supabaseUrl || ''}
                  onChange={(e) =>
                    setSupabaseConfig({ ...supabaseConfig, supabaseUrl: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.825rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                  Supabase Anon Key
                </label>
                <input
                  type="password"
                  placeholder="eyJhbGciOi..."
                  value={supabaseConfig.supabaseAnonKey || ''}
                  onChange={(e) =>
                    setSupabaseConfig({ ...supabaseConfig, supabaseAnonKey: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.825rem',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Reset / Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}
              onClick={handleResetLocal}
            >
              <RefreshCw size={14} />
              <span>Reset Local Cache</span>
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ minWidth: '120px' }}>
                {saveSuccess ? (
                  <>
                    <Check size={16} />
                    <span>Saved!</span>
                  </>
                ) : (
                  'Save Settings'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
