import type { ErrorCode, ErrorDescriptor } from '../types/portfolio';

export const ERROR_CATALOG: Record<ErrorCode, ErrorDescriptor> = {
  '404': {
    code: '404',
    badge: 'ERR // 404 · NOT FOUND',
    statusText: 'HTTP 404 · Resource Not Found',
    title: 'Page or case study route not found.',
    summary:
      'The URL path, section anchor, or project identifier you requested does not match an active route in this portfolio.',
    detail:
      'Check the address bar for typos, jump directly to a verified section below, or press Alt+K to search all sections and case studies.',
    hash: '#404',
  },
  '403': {
    code: '403',
    badge: 'ERR // 403 · RESTRICTED ACCESS',
    statusText: 'HTTP 403 · Department-Restricted Resource',
    title: 'Restricted internal department system.',
    summary:
      'This resource is restricted to authorized accounts within Gordon College, College of Computer Studies.',
    detail:
      'Internal department repositories and live clearance endpoints (such as Check8) are private to protect student records. You can review the complete architectural & UX case study below.',
    hash: '#403',
  },
  '500': {
    code: '500',
    badge: 'ERR // 500 · APPLICATION FAULT',
    statusText: 'HTTP 500 · Unexpected Runtime Exception',
    title: 'Something went wrong while rendering this view.',
    summary:
      'An unexpected client or rendering exception interrupted the current view.',
    detail:
      'Reset the view state below to return cleanly to the portfolio home screen without losing your theme preference.',
    hash: '#500',
  },
  '503': {
    code: '503',
    badge: 'ERR // 503 · SERVICE UNAVAILABLE',
    statusText: 'HTTP 503 · External Service or Network Unavailable',
    title: 'External telemetry or network connection unavailable.',
    summary:
      'A third-party service or network connection could not be reached right now.',
    detail:
      'Core portfolio sections, project case studies, and cached GitHub contribution snapshots remain accessible offline.',
    hash: '#503',
  },
};

export const ERROR_JUMP_ITEMS = Object.values(ERROR_CATALOG);
