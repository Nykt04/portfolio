import { useEffect, useRef, useState } from 'react';
import { Settings, X, Sparkles, Orbit, Code2, RotateCcw, Check, Palette } from 'lucide-react';

export interface SettingsState {
  stars: boolean;
  binary: boolean;
  accent: 'mint' | 'cyan' | 'amber';
}

interface SettingsMenuProps {
  paused: boolean;
  setPaused: (value: boolean) => void;
  onReplayIntro?: () => void;
}

const defaultSettings: SettingsState = {
  stars: true,
  binary: true,
  accent: 'mint',
};

export default function SettingsMenu({ paused, setPaused, onReplayIntro }: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(() => {
    try {
      const saved = localStorage.getItem('gk_portfolio_settings');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const openerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Apply settings to document element
  useEffect(() => {
    document.documentElement.dataset.stars = settings.stars ? 'enabled' : 'disabled';
    document.documentElement.dataset.binary = settings.binary ? 'enabled' : 'disabled';
    document.documentElement.dataset.themeAccent = settings.accent;
    try {
      localStorage.setItem('gk_portfolio_settings', JSON.stringify(settings));
    } catch {
      // ignore local storage errors
    }
  }, [settings]);

  // Handle escape and focus management
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        openerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetDefaults = () => {
    setSettings(defaultSettings);
    setPaused(false);
  };

  return (
    <>
      <button
        ref={openerRef}
        className={`settings-toggle ${isOpen ? 'is-active' : ''}`}
        type="button"
        aria-label={isOpen ? 'Close settings menu' : 'Open settings menu'}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings size={16} aria-hidden="true" />
        <span>Config</span>
      </button>

      {isOpen && (
        <div className="settings-overlay" onClick={() => setIsOpen(false)}>
          <div
            ref={dialogRef}
            className="settings-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            onClick={e => e.stopPropagation()}
          >
            <div className="settings-header">
              <div className="settings-title-group">
                <Settings size={18} className="settings-icon-spin" aria-hidden="true" />
                <h2 id="settings-title">SYSTEM CONFIG</h2>
              </div>
              <button
                className="settings-close"
                type="button"
                aria-label="Close settings"
                onClick={() => {
                  setIsOpen(false);
                  openerRef.current?.focus();
                }}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="settings-body">
              {/* Option 1: Motion Animations */}
              <div className="settings-row">
                <div className="settings-meta">
                  <div className="settings-label">
                    <Orbit size={16} aria-hidden="true" />
                    <strong>Motion & Transitions</strong>
                  </div>
                  <p>Page reveals, button physics, and view transitions.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={!paused}
                  className={`switch-control ${!paused ? 'is-checked' : ''}`}
                  onClick={() => setPaused(!paused)}
                >
                  <span className="switch-thumb" />
                </button>
              </div>

              {/* Option 2: Space Starfield */}
              <div className="settings-row">
                <div className="settings-meta">
                  <div className="settings-label">
                    <Sparkles size={16} aria-hidden="true" />
                    <strong>Cosmic Starfield</strong>
                  </div>
                  <p>Twinkling stars, meteor streaks, and celestial nebulae.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.stars}
                  className={`switch-control ${settings.stars ? 'is-checked' : ''}`}
                  onClick={() => updateSetting('stars', !settings.stars)}
                >
                  <span className="switch-thumb" />
                </button>
              </div>

              {/* Option 3: Binary Streams */}
              <div className="settings-row">
                <div className="settings-meta">
                  <div className="settings-label">
                    <Code2 size={16} aria-hidden="true" />
                    <strong>Binary Telemetry</strong>
                  </div>
                  <p>Streaming ASCII binary code on both backgrounds.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.binary}
                  className={`switch-control ${settings.binary ? 'is-checked' : ''}`}
                  onClick={() => updateSetting('binary', !settings.binary)}
                >
                  <span className="switch-thumb" />
                </button>
              </div>

              {/* Option 4: Accent Theme */}
              <div className="settings-row accent-row">
                <div className="settings-meta">
                  <div className="settings-label">
                    <Palette size={16} aria-hidden="true" />
                    <strong>Cosmic Accent Color</strong>
                  </div>
                  <p>Select interface telemetry and highlight frequency.</p>
                </div>
                <div className="accent-picker" role="radiogroup" aria-label="Theme accent color">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={settings.accent === 'mint'}
                    className={`accent-chip chip-mint ${settings.accent === 'mint' ? 'is-selected' : ''}`}
                    onClick={() => updateSetting('accent', 'mint')}
                    title="Mint Nebula"
                  >
                    <span className="chip-dot" />
                    <span>Mint</span>
                    {settings.accent === 'mint' && <Check size={14} aria-hidden="true" />}
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={settings.accent === 'cyan'}
                    className={`accent-chip chip-cyan ${settings.accent === 'cyan' ? 'is-selected' : ''}`}
                    onClick={() => updateSetting('accent', 'cyan')}
                    title="Cyber Cyan"
                  >
                    <span className="chip-dot" />
                    <span>Cyan</span>
                    {settings.accent === 'cyan' && <Check size={14} aria-hidden="true" />}
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={settings.accent === 'amber'}
                    className={`accent-chip chip-amber ${settings.accent === 'amber' ? 'is-selected' : ''}`}
                    onClick={() => updateSetting('accent', 'amber')}
                    title="Solar Amber"
                  >
                    <span className="chip-dot" />
                    <span>Amber</span>
                    {settings.accent === 'amber' && <Check size={14} aria-hidden="true" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="settings-footer">
              <div className="settings-footer-actions">
                <button className="settings-reset" type="button" onClick={resetDefaults}>
                  <RotateCcw size={14} aria-hidden="true" />
                  <span>Reset defaults</span>
                </button>
                {onReplayIntro && (
                  <button
                    className="settings-reset"
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onReplayIntro();
                    }}
                  >
                    <Sparkles size={14} aria-hidden="true" />
                    <span>Replay Intro</span>
                  </button>
                )}
              </div>
              <button className="button primary settings-done" type="button" onClick={() => setIsOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
