import { useEffect, useState } from 'react';
import { portfolio as p } from './portfolio';

export default function SpaceTerminal() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (total: number) => {
    const mins = String(Math.floor(total / 60)).padStart(2, '0');
    const secs = String(total % 60).padStart(2, '0');
    return `00:${mins}:${secs}`;
  };

  return (
    <aside className="backdrop-terminal" aria-hidden="true">
      <div className="terminal-header">
        <div className="terminal-signals">
          <span className="signal-dot red" />
          <span className="signal-dot amber" />
          <span className="signal-dot green" />
        </div>
        <span className="terminal-id">ORBIT-OS // TTY-01</span>
        <span className="terminal-ping">[LINK: 12ms]</span>
      </div>

      <div className="terminal-body">
        <div className="terminal-row row-meta">
          <span className="t-prefix">SYS:</span>
          <span>STATION // GORDON_COLLEGE_NODE</span>
        </div>
        <div className="terminal-row">
          <span className="t-prefix">LOC:</span>
          <span>14.8386° N, 120.2842° E [OLONGAPO]</span>
        </div>
        <div className="terminal-row">
          <span className="t-prefix">DEV:</span>
          <span className="t-highlight">{p.name.toUpperCase()}</span>
        </div>
        <div className="terminal-row">
          <span className="t-prefix">ROLE:</span>
          <span>{p.course.toUpperCase()} DEVELOPER</span>
        </div>
        <div className="terminal-row">
          <span className="t-prefix">CORE:</span>
          <span className="t-accent">NEXT.JS // TYPESCRIPT // C // SUPABASE</span>
        </div>
        <div className="terminal-row row-dim">
          <span className="t-prefix">STAT:</span>
          <span>COOLANT: 100% • TELEMETRY: NOMINAL</span>
        </div>
        <div className="terminal-row row-dim">
          <span className="t-prefix">TIME:</span>
          <span>T+ {formatUptime(seconds)} MISSION_UPTIME</span>
        </div>
        <div className="terminal-prompt-line">
          <span className="t-prompt">$</span>
          <span>execute user_experience.bin</span>
          <span className="t-cursor" />
        </div>
      </div>
    </aside>
  );
}
