import { useEffect, useState, type RefObject } from 'react';
import { scramble } from './scramble';

export function motionAllowed() {
  return document.documentElement.dataset.motion === 'enabled';
}

export function usePageMotion(view: boolean, mainRef: RefObject<HTMLElement | null>) {
  const [motionChoice, setMotionChoice] = useState<'auto' | 'on' | 'off'>('auto');
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', onChange);
    return () => preference.removeEventListener('change', onChange);
  }, []);

  const paused = motionChoice === 'off' || (motionChoice === 'auto' && reducedMotion);
  const setPaused = (value: boolean) => setMotionChoice(value ? 'off' : 'on');

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'enabled';
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main || paused) return;

    const targets = main.querySelectorAll<HTMLElement>('.hero-copy, .hero-art, .about-grid > div, .responsibilities, .toolkit-title-row, .skills-list, .tool-description, .projects-heading, .project-track, .certifications-heading, .certifications-grid, .approach-heading, .approach-steps, .approach-detail, .contact-top, .contact-bottom, .case-title, .case-meta, .case-section');

    // Smoothly fade in/out on scroll without thrashing GPU memory
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-in-view', entry.isIntersecting);
      });
    }, { rootMargin: '-20px 0px -20px 0px', threshold: 0.05 });
    targets.forEach(element => { element.classList.add('scroll-reveal'); reveal.observe(element); });

    // Infinite loops pause off-screen or when tab is hidden
    const loops = [...main.querySelectorAll<HTMLElement>('.hero-art, .marquee')];
    const onScreen = new Set<Element>();
    const syncActivity = () => loops.forEach(el => { el.dataset.motionRunning = String(onScreen.has(el) && !document.hidden); });
    const visibility = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) onScreen.add(entry.target); else onScreen.delete(entry.target); });
      syncActivity();
    }, { threshold: 0 });
    loops.forEach(el => visibility.observe(el));

    // Press ripple on buttons (lightweight CSS transform)
    const ripple = (event: PointerEvent) => {
      const button = (event.target as Element).closest<HTMLElement>('.button');
      if (!button) return;
      const box = button.getBoundingClientRect();
      button.style.setProperty('--rx', `${event.clientX - box.left}px`);
      button.style.setProperty('--ry', `${event.clientY - box.top}px`);
      button.classList.remove('is-rippling');
      void button.offsetWidth;
      button.classList.add('is-rippling');
    };
    main.addEventListener('pointerdown', ripple, { passive: true });

    // Interactive 3D tilt & dynamic light glare on project cards and portrait
    let activeCard: HTMLElement | null = null;
    const cardMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const card = (event.target as Element).closest<HTMLElement>('.featured-project, .portrait');
      if (!card) {
        if (activeCard) {
          activeCard.style.setProperty('--tilt-x', '0deg');
          activeCard.style.setProperty('--tilt-y', '0deg');
          activeCard.style.setProperty('--glare-opacity', '0');
          activeCard = null;
        }
        return;
      }
      activeCard = card;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const tiltX = (py - 0.5) * -10;
      const tiltY = (px - 0.5) * 10;
      card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      card.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-opacity', '1');
    };
    const cardLeave = () => {
      if (activeCard) {
        activeCard.style.setProperty('--tilt-x', '0deg');
        activeCard.style.setProperty('--tilt-y', '0deg');
        activeCard.style.setProperty('--glare-opacity', '0');
        activeCard = null;
      }
    };
    document.addEventListener('pointermove', cardMove, { passive: true });
    document.addEventListener('pointerleave', cardLeave, { passive: true });

    // Header, button, and toolkit card micro-decoder on mouse hover
    const decoding = new WeakSet<Element>();
    const navHover = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const target = (event.target as Element).closest<HTMLElement>(
        '.navigation a, .header-contact, .button, .text-link, .skill, .toolkit-filters button, .project-tab, .filter-chip'
      );
      if (!target || decoding.has(target) || target.contains(event.relatedTarget as Node)) return;
      decoding.add(target);
      const duration = target.classList.contains('skill') ? 280 : 250;
      scramble(target, duration, () => decoding.delete(target));
    };
    document.addEventListener('pointerover', navHover, { passive: true });

    // Section headings, titles, and atmosphere tags decode on scroll
    const activeCancels = new Map<HTMLElement, () => void>();
    const headingDecode = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          activeCancels.get(el)?.();
          const duration = el.tagName === 'H1' ? 480 : 360;
          const cancel = scramble(el, duration, () => activeCancels.delete(el));
          activeCancels.set(el, cancel);
        } else {
          const cancel = activeCancels.get(el);
          if (cancel) {
            cancel();
            activeCancels.delete(el);
          }
        }
      });
    }, { threshold: 0.2 });
    main.querySelectorAll('h1, h2, .section-atmosphere span, .case-title h1').forEach(el => headingDecode.observe(el));

    document.addEventListener('visibilitychange', syncActivity);

    return () => {
      headingDecode.disconnect();
      activeCancels.forEach(cancel => cancel());
      activeCancels.clear();
      document.removeEventListener('pointerover', navHover);
      document.removeEventListener('pointermove', cardMove);
      document.removeEventListener('pointerleave', cardLeave);
      cardLeave();
      reveal.disconnect();
      visibility.disconnect();
      main.removeEventListener('pointerdown', ripple);
      document.removeEventListener('visibilitychange', syncActivity);
      targets.forEach(element => element.classList.remove('scroll-reveal', 'is-in-view'));
      loops.forEach(el => { el.dataset.motionRunning = 'false'; });
    };
  }, [view, paused, reducedMotion, mainRef]);

  return { paused, setPaused, reducedMotion };
}
