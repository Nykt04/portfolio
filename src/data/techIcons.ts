import {
  siC,
  siFigma,
  siGit,
  siGithub,
  siJavascript,
  siPython,
  siSupabase,
  siTypescript,
  siVercel,
} from 'simple-icons';
import { designIcons } from './icons/designIcons';
import { editorIcons } from './icons/editorIcons';

export const techIcons: Record<string, { path: string }> = {
  Python: siPython,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  C: siC,
  Figma: siFigma,
  Git: siGit,
  GitHub: siGithub,
  Vercel: siVercel,
  Supabase: siSupabase,
  Photoshop: designIcons.adobephotoshop,
  Illustrator: designIcons.adobeillustrator,
  Canva: designIcons.canva,
  'VS Code': editorIcons.visualstudiocode,
};

export const languageDescriptions: Record<string, string> = {
  Python: 'Scripting, algorithms, and backend automation.',
  TypeScript: 'Type-safe UI components and predictable app state.',
  JavaScript: 'Interactive browser views and Node.js / Express APIs.',
  C: 'Low-level memory management, pointers, and systems logic.',
};
