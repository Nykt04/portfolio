import { useEffect, useState } from 'react';

const FALLBACK_GH_LEVELS =
  '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000002000000200000000000000000000000000000001000000000004110000000000013003001001020111100401200000000000000000000000000000000000000000230100000000000000000000000000000000020000011011000000000000000000000000000000000000100000010000002110000000000000000010010440';

export interface GhDay {
  date?: string;
  count?: number;
  level: number;
}

export function useGitHubContributions(username: string) {
  const [total, setTotal] = useState<number>(156);
  const [days, setDays] = useState<GhDay[]>(() =>
    FALLBACK_GH_LEVELS.split('').map((ch) => ({ level: Number(ch) || 0 })),
  );

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data || !Array.isArray(data.contributions)) return;
        setDays(
          data.contributions.map((d: { date?: string; count?: number; level?: number }) => ({
            date: d.date,
            count: d.count,
            level: Math.min(4, Math.max(0, Number(d.level) || 0)),
          })),
        );
        if (data.total && typeof data.total.lastYear === 'number') {
          setTotal(data.total.lastYear);
        }
      })
      .catch(() => {
        // Keep seeded snapshot when offline
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { total, days };
}
