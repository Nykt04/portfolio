import { useEffect, useRef, useState, type RefObject } from 'react';
import { flushSync } from 'react-dom';
import { ERROR_CATALOG } from '../data/errors';
import { defaultFeaturedId, portfolio as p, projects } from '../data/portfolio';
import type { ErrorCode } from '../types/portfolio';
import { resolveRouteError } from '../utils/routeError';

export function useHashRoute(
  mainRef: RefObject<HTMLElement | null>,
  onRouteTransition?: (nextIsCaseStudy: boolean) => void,
) {
  const [routeError, setRouteError] = useState<ErrorCode | null>(() =>
    typeof window !== 'undefined'
      ? resolveRouteError(window.location.pathname, window.location.hash)
      : null,
  );
  const [isCaseStudy, setIsCaseStudy] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash.startsWith('#case-study') : false,
  );
  const [caseStudyId, setCaseStudyId] = useState(() => {
    const match = typeof window !== 'undefined' ? window.location.hash.match(/[?&]p=([^&]+)/) : null;
    return match ? match[1] : defaultFeaturedId;
  });

  const priorView = useRef(isCaseStudy);
  const onRouteTransitionRef = useRef(onRouteTransition);
  onRouteTransitionRef.current = onRouteTransition;

  // Sync hash/path navigation (#case-study vs #home/#work/etc. and error routes)
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      if (hash === '#main') return;
      const nextErr = resolveRouteError(window.location.pathname, hash);
      if (!nextErr && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        window.history.replaceState(null, '', `/${hash}`);
      }
      const nextIsCase = !nextErr && hash.startsWith('#case-study');
      const pidMatch = hash.match(/[?&]p=([^&]+)/);
      if (!hash.startsWith('#case-study-')) {
        setCaseStudyId(pidMatch ? pidMatch[1] : defaultFeaturedId);
      }

      const viewChanged = nextIsCase !== priorView.current || Boolean(nextErr);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const applyState = () => {
        setRouteError(nextErr);
        setIsCaseStudy(nextIsCase);
        onRouteTransitionRef.current?.(nextIsCase);
      };

      if (viewChanged && document.startViewTransition && !reduceMotion) {
        document.startViewTransition(() => {
          flushSync(applyState);
          const targetId = hash.split('?')[0].slice(1);
          const target = !nextErr ? document.getElementById(targetId) : null;
          if (target) target.scrollIntoView({ behavior: 'instant' });
          else window.scrollTo({ top: 0, behavior: 'instant' });
        });
      } else {
        applyState();
        const targetId = hash.split('?')[0].slice(1);
        const target = !nextErr ? document.getElementById(targetId) : null;
        if (target) {
          target.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
        } else if (viewChanged) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    };

    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
    };
  }, []);

  // Update document title and move focus to <main> on view switches
  useEffect(() => {
    const currentProj = projects.find((item) => item.id === caseStudyId) || projects[0];
    document.title = routeError
      ? `${routeError} · ${ERROR_CATALOG[routeError].statusText} | ${p.shortName}`
      : isCaseStudy
        ? `${currentProj.name} · Case Study | ${p.shortName}`
        : `${p.name} · ${p.title}`;

    if (priorView.current !== isCaseStudy || routeError) {
      priorView.current = isCaseStudy;
      requestAnimationFrame(() => {
        const cleanId = window.location.hash.split('?')[0].slice(1);
        const target = !routeError ? document.getElementById(cleanId) : null;
        if (target) target.scrollIntoView({ behavior: 'instant' });
        else window.scrollTo({ top: 0, behavior: 'instant' });
        mainRef.current?.focus({ preventScroll: true });
      });
    }
  }, [isCaseStudy, caseStudyId, routeError, mainRef]);

  return {
    routeError,
    setRouteError,
    isCaseStudy,
    setIsCaseStudy,
    caseStudyId,
    setCaseStudyId,
  };
}
