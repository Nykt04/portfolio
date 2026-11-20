import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function ThemeSwitcher() {
  const { pref, setTheme } = useTheme();

  return (
    <div className="theme-switch" role="group" aria-label="Color theme">
      <button
        type="button"
        onClick={(e) => setTheme('system', e)}
        className={`theme-opt ${pref === 'system' ? 'is-active' : ''}`}
        title="System theme"
        aria-label="System theme"
        aria-pressed={pref === 'system'}
      >
        <Monitor size={13} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => setTheme('light', e)}
        className={`theme-opt ${pref === 'light' ? 'is-active' : ''}`}
        title="Light theme (Crisp White)"
        aria-label="Light theme"
        aria-pressed={pref === 'light'}
      >
        <Sun size={13} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => setTheme('dark', e)}
        className={`theme-opt ${pref === 'dark' ? 'is-active' : ''}`}
        title="Dark theme (Monochrome Dark)"
        aria-label="Dark theme"
        aria-pressed={pref === 'dark'}
      >
        <Moon size={13} aria-hidden="true" />
      </button>
    </div>
  );
}
