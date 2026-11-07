import { useEffect, useState } from 'react';
import { portfolio as p } from './portfolio';
import { motionAllowed } from './usePageMotion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'finishing' | 'done'>('loading');
  const [statusText, setStatusText] = useState('SYSTEM INITIALIZATION');

  useEffect(() => {
    // If reduced motion is requested, finish quickly
    if (!motionAllowed() && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(100);
      onComplete();
      return;
    }

    const start = performance.now();
    const duration = 1600; // 1.6s total: dramatic, kinetic, and brisk

    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // Non-linear easing: starts fast, short pause around 72%, snaps to 100%
      const eased = t < 0.7
        ? Math.pow(t / 0.7, 1.35) * 0.75
        : 0.75 + Math.pow((t - 0.7) / 0.3, 2) * 0.25;

      const current = Math.min(100, Math.floor(eased * 100));
      setProgress(current);

      if (current < 30) {
        setStatusText('INITIALIZING CORE ENGINE');
      } else if (current < 72) {
        setStatusText('COMPILING GRAPHICS & ASSETS');
      } else if (current < 99) {
        setStatusText('SYNCING EXPERIENCE');
      } else {
        setStatusText('READY');
      }

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        setProgress(100);
        setStatusText('READY');
        setPhase('finishing');
        // Curtain slides upward, then notify parent to unmount
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 650);
      }
    };

    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <aside
      className={`preloader-curtain phase-${phase}`}
      aria-label="Portfolio loading screen"
      aria-live="polite"
    >
      <div className="preloader-bg" />

      {/* Top telemetry */}
      <div className="preloader-top container">
        <div className="preloader-brand">
          <span className="preloader-logo">gk<span>.</span></span>
          <span className="preloader-author">{p.name.toUpperCase()}</span>
        </div>
        <div className="preloader-status-tag">
          <span className="status-blink" aria-hidden="true" />
          <span>{statusText}</span>
        </div>
      </div>

      {/* Center Kinetic Counter (Christen Dijoux style) */}
      <div className="preloader-center">
        <div className="preloader-counter" aria-hidden="true">
          <span className="counter-digits">{String(progress).padStart(2, '0')}</span>
          <span className="counter-unit">%</span>
        </div>

        {/* Progress line */}
        <div className="preloader-track" aria-hidden="true">
          <div className="preloader-bar" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>

        <div className="preloader-subtext" aria-hidden="true">
          <span>PORTFOLIO</span>
          <span className="preloader-dot">•</span>
          <span>{p.course.toUpperCase()}</span>
          <span className="preloader-dot">•</span>
          <span>EST. {new Date().getFullYear()}</span>
        </div>
      </div>

      {/* Bottom telemetry */}
      <div className="preloader-bottom container">
        <span className="preloader-coord">14.8386° N, 120.2842° E // OLONGAPO</span>
        <span className="preloader-percent-accessible sr-only">
          {progress === 100 ? 'Portfolio ready' : `Loading portfolio: ${progress}%`}
        </span>
        <span className="preloader-hint">DEV.EDITION</span>
      </div>
    </aside>
  );
}
