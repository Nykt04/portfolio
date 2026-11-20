import { projects } from '../data/projects';
import type { ErrorCode } from '../types/portfolio';

const VALID_SECTIONS = new Set([
  'home',
  'work',
  'about',
  'toolkit',
  'certifications',
  'github',
  'contact',
  'main',
]);

export function resolveRouteError(pathname: string, hash: string): ErrorCode | null {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const cleanHash = hash.trim();
  const hashBase = cleanHash.split('?')[0].replace(/^#/, '').toLowerCase();

  // Explicit error hashes (#404, #403, #500, #503)
  if (hashBase === '404' || hashBase === 'not-found') return '404';
  if (hashBase === '403' || hashBase === 'forbidden' || hashBase === 'restricted') return '403';
  if (hashBase === '500' || hashBase === 'error') return '500';
  if (hashBase === '503' || hashBase === 'offline' || hashBase === 'unavailable') return '503';

  // Explicit error paths (/404, /403, /500, /503) when no valid section hash overrides
  if (!cleanHash) {
    if (cleanPath === '/403' || cleanPath === '/restricted') return '403';
    if (cleanPath === '/500') return '500';
    if (cleanPath === '/503' || cleanPath === '/offline') return '503';
    if (cleanPath !== '/' && cleanPath !== '/index.html') return '404';
  }

  if (!cleanHash) return null;

  // Validate #case-study and #case-study?p=<id>
  if (hashBase === 'case-study' || hashBase.startsWith('case-study-')) {
    const pidMatch = cleanHash.match(/[?&]p=([^&]+)/);
    if (pidMatch) {
      const pid = decodeURIComponent(pidMatch[1]);
      const exists = projects.some((item) => item.id === pid);
      if (!exists) return '404';
    }
    return null;
  }

  // Any other unrecognized hash anchor -> 404
  if (!VALID_SECTIONS.has(hashBase)) {
    return '404';
  }

  return null;
}

export function getRouteViewKey(routeError: ErrorCode | null, isCaseStudy: boolean): string {
  if (routeError) return `error:${routeError}`;
  return isCaseStudy ? 'case-study' : 'home';
}

export function isViewChange(
  prevViewKey: string,
  nextRouteError: ErrorCode | null,
  nextIsCaseStudy: boolean,
): boolean {
  return getRouteViewKey(nextRouteError, nextIsCaseStudy) !== prevViewKey;
}

export function getNormalizedPathnameForLink(pathname: string, currentHash: string): string | null {
  if (pathname === '/' || pathname === '/index.html') return null;
  return currentHash ? `/${currentHash}` : '/';
}
