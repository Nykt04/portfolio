import { useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react';

export type ThemePref = 'system' | 'light' | 'dark';

declare global {
  interface Window {
    setPortfolioTheme?: (pref: ThemePref, ev?: MouseEvent | ReactMouseEvent) => void;
  }
}

export function useTheme() {
  const [pref, setPref] = useState<ThemePref>(() => {
    if (typeof document === 'undefined') return 'dark';
    const attr = document.documentElement.dataset.themePref;
    if (attr === 'light' || attr === 'dark' || attr === 'system') return attr;
    return 'dark';
  });

  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true,
  );

  useEffect(() => {
    const syncDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    const onThemeChange = (e: Event) => {
      const detail = (e as CustomEvent<{ pref?: ThemePref; dark?: boolean }>).detail;
      if (detail?.pref) setPref(detail.pref);
      setIsDark(
        typeof detail?.dark === 'boolean'
          ? detail.dark
          : document.documentElement.classList.contains('dark'),
      );
    };
    const observer = new MutationObserver(syncDark);

    window.addEventListener('gk-theme-change', onThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('gk-theme-change', onThemeChange);
      observer.disconnect();
    };
  }, []);

  const setTheme = (next: ThemePref, e?: ReactMouseEvent<HTMLButtonElement>) => {
    setPref(next);
    if (window.setPortfolioTheme) {
      window.setPortfolioTheme(next, e);
    } else {
      document.documentElement.classList.toggle('dark', next === 'dark');
      setIsDark(next === 'dark');
    }
  };

  return { pref, isDark, setTheme };
}
