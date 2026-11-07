import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ReadingProgress({ view }: { view: boolean }) {
  const bar = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, window.scrollY / distance) : 0})`;
        setShowTop(window.scrollY > 700);
      });
    };
    update();
    const resize = new ResizeObserver(update);
    resize.observe(document.body);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [view]);
  return <><div ref={bar} className="reading-progress" aria-hidden="true" />{showTop && <a className="floating-top" href={view ? '#case-study' : '#home'} aria-label="Back to top"><ArrowUp size={20} aria-hidden="true" /></a>}</>;
}
