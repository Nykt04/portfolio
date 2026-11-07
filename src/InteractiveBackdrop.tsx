import { useEffect, useRef } from 'react';
import SpaceTerminal from './SpaceTerminal';
import Constellations from './Constellations';

// Optimized cosmic particles: 10 particles
const particles = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  x: `${(index * 37 + 9) % 100}%`,
  y: `${(index * 61 + 8) % 100}%`,
  delay: `${(index % 4) * -1.5}s`,
  size: `${index % 2 === 0 ? 3 : 2}px`,
}));

// Optimized distant stars: 20 twinkling stars (down from 42, no box-shadow repaints)
const stars = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  x: `${(index * 23 + 7) % 100}%`,
  y: `${(index * 47 + 13) % 100}%`,
  size: `${index % 3 === 0 ? 2.5 : 1.5}px`,
  delay: `${(index % 5) * -1.2}s`,
  dur: `${3 + (index % 3) * 1.2}s`,
  opacity: 0.25 + ((index % 4) * 0.15),
}));

// Streamlined ASCII binary columns: 4 columns, rendered as lightweight single text blocks (0 span nodes)
export const binaryStreams = [
  { id: 1, left: '8%', bits: '01000111\n01001011\n01100101\n01110110', delay: '0s', dur: '22s' },
  { id: 2, left: '32%', bits: '01000011\n01010011\n01000111\n01001011', delay: '-7s', dur: '26s' },
  { id: 3, left: '68%', bits: '01100100\n01100101\n01000011\n01010011', delay: '-13s', dur: '24s' },
  { id: 4, left: '92%', bits: '01110110\n01101111\n01100100\n01100101', delay: '-5s', dur: '28s' },
];

export function BinaryStreams({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  return (
    <div className={`backdrop-binary ${theme === 'light' ? 'binary-light' : 'binary-dark'}`} aria-hidden="true">
      {binaryStreams.map(s => (
        <div
          key={s.id}
          className="binary-column"
          style={{
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        >
          {s.bits}
        </div>
      ))}
    </div>
  );
}

export default function InteractiveBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty('--pointer-x', `${event.clientX}px`);
        element.style.setProperty('--pointer-y', `${event.clientY}px`);
        element.style.setProperty('--pointer-visible', '1');
      });
    };

    const leave = () => {
      cancelAnimationFrame(frame);
      element.style.setProperty('--pointer-visible', '0');
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', leave, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div ref={ref} className="interactive-backdrop" aria-hidden="true">
      <div className="backdrop-nebula" />
      <div className="backdrop-glow" />
      <div className="backdrop-stars">
        {stars.map(star => (
          <i
            key={star.id}
            className="backdrop-star"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.dur,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      <div className="shooting-star" />
      <div className="backdrop-particles">
        {particles.map(particle => (
          <i
            key={particle.id}
            style={{
              left: particle.x,
              top: particle.y,
              animationDelay: particle.delay,
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </div>
      <BinaryStreams theme="dark" />
      <SpaceTerminal />
      <Constellations />
    </div>
  );
}
