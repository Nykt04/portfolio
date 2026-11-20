import { Code2 } from 'lucide-react';
import { techIcons } from '../../data/techIcons';

export function TechIcon({ name, size = 16 }: { name: string; size?: number }) {
  const icon = techIcons[name];
  if (icon) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={icon.path} />
      </svg>
    );
  }
  return <Code2 size={size} aria-hidden="true" />;
}
