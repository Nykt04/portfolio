import { useEffect, type RefObject } from 'react';

export function useScrollReveal(rootRef: RefObject<HTMLElement | null>, viewKey: string) {
  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const fadeTargets = Array.from(
      rootEl.querySelectorAll<HTMLElement>(
        'section:not(#home):not(#work), #work > div:first-child, #work article',
      ),
    );
    if (!fadeTargets.length || reduceMotion) return;

    fadeTargets.forEach((el) => {
      el.classList.add('scroll-fade');
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 16 && rect.bottom > 0) {
        el.classList.add('is-visible');
      }
    });

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -16px 0px', threshold: 0.01 },
    );

    fadeTargets.forEach((el) => fadeObserver.observe(el));

    return () => {
      fadeObserver.disconnect();
      fadeTargets.forEach((el) => el.classList.remove('scroll-fade', 'is-visible'));
    };
  }, [rootRef, viewKey]);
}
