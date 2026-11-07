import { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Info, 
  Search, 
  Sparkles, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  Lock, 
  RotateCw, 
  Calendar, 
  Phone, 
  FileText, 
  Users, 
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface ProjectWireframesProps {
  projectId: string;
  projectName: string;
}

interface WireframeScreen {
  id: string;
  title: string;
  url: string;
  annotations: {
    pin: string;
    rule: string;
    description: string;
  }[];
}

const PROJECT_SCREENS: Record<string, WireframeScreen[]> = {
  'featured-project': [
    {
      id: 'dashboard',
      title: 'Deck Hub & AI Generator',
      url: 'ace-it.edu/dashboard',
      annotations: [
        { pin: '①', rule: "Hick's Law Decision Hierarchy", description: 'Prominent prompt box allows 1-click deck creation, reducing time-to-first-study.' },
        { pin: '②', rule: "Fitts's Law Touch Target", description: 'Full-width "Study Active Recall" CTAs provide large cursor and thumb hitting area.' },
        { pin: '③', rule: 'Progressive Reinforcement', description: 'Mastery percentage chips display spaced-repetition progress at a glance.' }
      ]
    },
    {
      id: 'study-mode',
      title: 'Active Recall Study Canvas',
      url: 'ace-it.edu/study/cs311',
      annotations: [
        { pin: '①', rule: 'Distraction-Free Focus', description: 'Removes global navigation during review sessions to minimize cognitive overload.' },
        { pin: '②', rule: 'Active Recall Gate', description: 'Answer remains hidden until deliberate flip action, enforcing active retrieval.' },
        { pin: '③', rule: 'Thumb-Zone Grading', description: 'Hard/Good/Easy buttons anchored in the natural mobile thumb reach zone.' }
      ]
    }
  ],
  'project-2': [
    {
      id: 'portal-home',
      title: 'Institutional Public Portal',
      url: 'crhs-web.vercel.app/home.html',
      annotations: [
        { pin: '①', rule: 'High-Priority Alert Banner', description: 'Critical memos sit above navigation for zero-scroll discovery during exam periods.' },
        { pin: '②', rule: 'High-Contrast Quick Tiles', description: '48px minimum touch buttons ensure elderly guardians find schedules effortlessly.' },
        { pin: '③', rule: 'Low-Bandwidth Newsfeed', description: 'Semantic card grids render instantly on 3G prepaid cellular mobile data.' }
      ]
    },
    {
      id: 'faculty-dept',
      title: 'Admissions & Department Directory',
      url: 'crhs-web.vercel.app/departments.html',
      annotations: [
        { pin: '①', rule: 'Clear Heading Hierarchy', description: 'H1/H2 semantic tree enables assistive screen readers to skip to specific tracks.' },
        { pin: '②', rule: 'Direct Action Links', description: 'Single-tap phone and email triggers allow direct parent-to-faculty consultation.' }
      ]
    }
  ],
  'project-3': [
    {
      id: 'student-passport',
      title: 'Clearance Passport & QR Hub',
      url: 'check8-1.onrender.com/passport',
      annotations: [
        { pin: '①', rule: 'Color-Independent Status', description: 'Clearance statuses pair text badges with distinct icons (Cleared, Pending, Locked).' },
        { pin: '②', rule: 'Dynamic Digital Token', description: 'High-density QR code replaces fragile paper slips with live verification.' },
        { pin: '③', rule: 'Prerequisite Dependency', description: 'Locked stations visibly communicate required prior checkpoint sign-offs.' }
      ]
    },
    {
      id: 'admin-scanner',
      title: 'Officer Fast-Scan Terminal',
      url: 'check8-1.onrender.com/admin/scanner',
      annotations: [
        { pin: '①', rule: 'Fast One-Tap Approval', description: 'Reduces queue wait time from 20 minutes to under 3 seconds per student.' },
        { pin: '②', rule: 'Cryptographic Audit Trail', description: 'Records staff ID and timestamp for tamper-proof accountability.' }
      ]
    }
  ]
};

export default function ProjectWireframes({ projectId, projectName }: ProjectWireframesProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return 'mobile';
    }
    return 'desktop';
  });
  const [screenIdx, setScreenIdx] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const screens = PROJECT_SCREENS[projectId] || PROJECT_SCREENS['featured-project'];
  const activeScreen = screens[screenIdx] || screens[0];

  return (
    <div className="wireframe-showcase" aria-label={`Interactive wireframe blueprints for ${projectName}`}>
      {/* Blueprint Header */}
      <div className="wireframe-header">
        <div className="wireframe-title-group">
          <span className="wireframe-badge">UI/UX Blueprint</span>
          <h3 className="wireframe-header-title">Wireframe & Interaction Flow: {projectName}</h3>
        </div>

        <div className="wireframe-toolbar">
          <div role="group" aria-label="Select viewport device" style={{ display: 'inline-flex', gap: '4px' }}>
            <button
              type="button"
              className={`wireframe-toggle-btn ${viewport === 'desktop' ? 'is-active' : ''}`}
              onClick={() => setViewport('desktop')}
              aria-pressed={viewport === 'desktop'}
            >
              <Monitor size={14} aria-hidden="true" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              className={`wireframe-toggle-btn ${viewport === 'mobile' ? 'is-active' : ''}`}
              onClick={() => setViewport('mobile')}
              aria-pressed={viewport === 'mobile'}
            >
              <Smartphone size={14} aria-hidden="true" />
              <span>Mobile</span>
            </button>
          </div>

          <button
            type="button"
            className={`wireframe-toggle-btn ${showAnnotations ? 'is-active' : ''}`}
            onClick={() => setShowAnnotations(prev => !prev)}
            aria-pressed={showAnnotations}
          >
            <Info size={14} aria-hidden="true" />
            <span>{showAnnotations ? 'Hide Annotations' : 'Show UX Annotations'}</span>
          </button>
        </div>
      </div>

      {/* Screen Selector Tabs */}
      <div className="wireframe-screen-nav" role="tablist" aria-label="Wireframe screens">
        {screens.map((scr, idx) => (
          <button
            key={scr.id}
            type="button"
            role="tab"
            aria-selected={screenIdx === idx}
            className={`wireframe-screen-tab ${screenIdx === idx ? 'is-active' : ''}`}
            onClick={() => setScreenIdx(idx)}
          >
            <span>{idx + 1}. {scr.title}</span>
          </button>
        ))}
      </div>

      {/* Interactive Wireframe Canvas */}
      <div className="wireframe-canvas">
        {viewport === 'desktop' ? (
          <div className="wf-desktop-frame">
            {/* Browser Window Header */}
            <div className="wf-window-bar">
              <div className="wf-dots" aria-hidden="true">
                <span className="wf-dot" style={{ borderColor: '#ef4444' }} />
                <span className="wf-dot" style={{ borderColor: '#eab308' }} />
                <span className="wf-dot" style={{ borderColor: '#22c55e' }} />
              </div>
              <div className="wf-address-bar">
                <Lock size={10} aria-hidden="true" />
                <span>https://{activeScreen.url}</span>
              </div>
            </div>

            {/* Desktop Screen Content */}
            <div className="wf-screen-body">
              {renderDesktopWireframe(projectId, screenIdx, showAnnotations)}
            </div>
          </div>
        ) : (
          <div className="wf-mobile-frame">
            <div className="wf-mobile-notch" aria-hidden="true">
              <div className="wf-mobile-speaker" />
            </div>

            {/* Mobile Screen Content */}
            <div className="wf-screen-body">
              {renderMobileWireframe(projectId, screenIdx, showAnnotations)}
            </div>

            <div className="wf-mobile-homebar" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* UX Design Rationale Legend */}
      {showAnnotations && (
        <div className="wireframe-legend">
          <div className="wireframe-legend-title">
            <Sparkles size={14} aria-hidden="true" />
            <span>UI/UX Decision Log & Design Rationale</span>
          </div>
          <div className="wireframe-legend-grid">
            {activeScreen.annotations.map(item => (
              <div key={item.pin} className="wireframe-legend-item">
                <span className="wf-pin" style={{ position: 'static', width: '18px', height: '18px' }}>
                  {item.pin}
                </span>
                <div>
                  <strong>{item.rule}:</strong> {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Render Desktop wireframe mockups
function renderDesktopWireframe(projectId: string, _screenIdx: number, showAnnotations: boolean) {
  if (projectId === 'project-2') {
    // CRHS Web Desktop
    return (
      <div style={{ display: 'grid', gap: '12px' }}>
        {/* Top Emergency Bulletin */}
        <div style={{ background: 'rgba(234, 179, 8, 0.12)', border: '1px solid #eab308', padding: '6px 12px', borderRadius: '4px', fontSize: '0.72rem', color: '#fef08a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>⚠️ ADVISORY: Midterm Examinations Schedule for Q2 — Nov 12-14, 2026</span>
          <span style={{ fontSize: '0.65rem', textDecoration: 'underline' }}>View PDF Notice</span>
          {showAnnotations && <span className="wf-pin" style={{ top: '10px', right: '120px' }}>①</span>}
        </div>

        {/* Global Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(141, 226, 201, 0.2)', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', background: 'rgba(141, 226, 201, 0.2)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '0.65rem', fontWeight: 'bold' }}>CR</div>
            <strong style={{ fontSize: '0.85rem' }}>Col. Ramon High School</strong>
          </div>
          <div style={{ display: 'flex', gap: '14px', fontSize: '0.74rem', color: '#88a99c' }}>
            <span style={{ color: 'var(--ui-accent)', fontWeight: 600 }}>Home</span>
            <span>Academics</span>
            <span>Admissions</span>
            <span>Faculty</span>
            <span>Contact</span>
          </div>
          <button type="button" className="wf-btn-primary" style={{ padding: '4px 10px', fontSize: '0.7rem' }}>Student Portal</button>
        </div>

        {/* Hero Banner Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '12px' }}>
          <div className="wf-ui-card">
            <span style={{ fontSize: '0.65rem', color: 'var(--ui-accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Official Campus Gateway</span>
            <h4 style={{ margin: '6px 0', fontSize: '1rem', color: '#e2f4ed' }}>Empowering Excellence in Public Secondary Education</h4>
            <p style={{ fontSize: '0.75rem', color: '#88a99c', margin: '0 0 10px' }}>Access official schedules, enrollment prerequisites, and academic track guidelines.</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" className="wf-btn-primary" style={{ fontSize: '0.7rem' }}>Download Enrollment Form</button>
              <button type="button" className="wf-btn-secondary" style={{ fontSize: '0.7rem' }}>School Calendar</button>
            </div>
          </div>

          {/* Quick Access Tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', position: 'relative' }}>
            {showAnnotations && <span className="wf-pin" style={{ top: '-10px', right: '-8px' }}>②</span>}
            <div className="wf-ui-card" style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px', margin: 0 }}>
              <Calendar size={14} color="var(--ui-accent)" />
              <strong style={{ fontSize: '0.72rem' }}>Grading Periods</strong>
              <small style={{ fontSize: '0.6rem', color: '#88a99c' }}>Quarterly Timetables</small>
            </div>
            <div className="wf-ui-card" style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px', margin: 0 }}>
              <Users size={14} color="var(--ui-accent)" />
              <strong style={{ fontSize: '0.72rem' }}>Faculty Heads</strong>
              <small style={{ fontSize: '0.6rem', color: '#88a99c' }}>Department Directory</small>
            </div>
            <div className="wf-ui-card" style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px', margin: 0 }}>
              <FileText size={14} color="var(--ui-accent)" />
              <strong style={{ fontSize: '0.72rem' }}>Senior High Vouchers</strong>
              <small style={{ fontSize: '0.6rem', color: '#88a99c' }}>DepEd Requirements</small>
            </div>
            <div className="wf-ui-card" style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px', margin: 0 }}>
              <Phone size={14} color="var(--ui-accent)" />
              <strong style={{ fontSize: '0.72rem' }}>Emergency Desk</strong>
              <small style={{ fontSize: '0.6rem', color: '#88a99c' }}>Guidance & Clinic</small>
            </div>
          </div>
        </div>

        {/* Latest Announcements */}
        <div style={{ position: 'relative' }}>
          {showAnnotations && <span className="wf-pin" style={{ top: '-4px', left: '160px' }}>③</span>}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Latest Verified Announcements</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--ui-accent)' }}>View all news →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <div className="wf-ui-card" style={{ margin: 0 }}>
              <span className="wf-status-chip is-cleared">STEM Track</span>
              <p style={{ fontSize: '0.72rem', margin: '6px 0', fontWeight: 600 }}>Science & Technology Fair 2026 Project Guidelines</p>
              <small style={{ fontSize: '0.62rem', color: '#88a99c' }}>Published Nov 01, 2026</small>
            </div>
            <div className="wf-ui-card" style={{ margin: 0 }}>
              <span className="wf-status-chip is-pending">Guardians</span>
              <p style={{ fontSize: '0.72rem', margin: '6px 0', fontWeight: 600 }}>General Parents & Teachers Assembly for Grade 11</p>
              <small style={{ fontSize: '0.62rem', color: '#88a99c' }}>Published Oct 29, 2026</small>
            </div>
            <div className="wf-ui-card" style={{ margin: 0 }}>
              <span className="wf-status-chip is-locked">Admissions</span>
              <p style={{ fontSize: '0.72rem', margin: '6px 0', fontWeight: 600 }}>Transferee & Freshmen Orientation Timetable</p>
              <small style={{ fontSize: '0.62rem', color: '#88a99c' }}>Published Oct 24, 2026</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'project-3') {
    // Check8 Desktop/Admin Station
    return (
      <div style={{ display: 'grid', gap: '14px' }}>
        {/* Officer Status Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0e1d18', padding: '8px 14px', borderRadius: '4px', border: '1px solid rgba(141, 226, 201, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="var(--ui-accent)" />
            <strong style={{ fontSize: '0.8rem' }}>Check8 Station: CCS Computer Laboratory 3</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="wf-status-chip is-cleared">Station Active</span>
            <small style={{ fontSize: '0.7rem', color: '#88a99c' }}>Officer ID: #CCS-LAB-402</small>
          </div>
        </div>

        {/* Scan & Student Verification Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '14px' }}>
          {/* Camera Scanner Viewport */}
          <div className="wf-ui-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '220px', borderStyle: 'dashed', position: 'relative' }}>
            {showAnnotations && <span className="wf-pin" style={{ top: '8px', left: '8px' }}>①</span>}
            <div style={{ width: '130px', height: '130px', border: '2px dashed var(--ui-accent)', borderRadius: '12px', display: 'grid', placeItems: 'center', background: 'rgba(141, 226, 201, 0.05)' }}>
              <QrCode size={56} color="var(--ui-accent)" strokeWidth={1.5} />
            </div>
            <span style={{ fontSize: '0.72rem', marginTop: '10px', color: '#a4c4b8' }}>Align Student Digital QR Code in Frame</span>
            <small style={{ fontSize: '0.65rem', color: '#688c7e' }}>Auto-detects active student tokens</small>
          </div>

          {/* Student Verification Record */}
          <div className="wf-ui-card" style={{ position: 'relative' }}>
            {showAnnotations && <span className="wf-pin" style={{ top: '-10px', right: '-8px' }}>②</span>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(141, 226, 201, 0.2)', paddingBottom: '10px' }}>
              <div>
                <span className="wf-status-chip is-cleared" style={{ marginBottom: '4px' }}>QR Validated</span>
                <h4 style={{ margin: '4px 0', fontSize: '0.95rem' }}>Marco Reyes</h4>
                <small style={{ fontSize: '0.7rem', color: '#88a99c' }}>BSCS 4A · Student ID: 2023-10492-OC</small>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.68rem', color: '#88a99c' }}>Clearance Progress</span>
                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--ui-accent)' }}>6 / 8 Cleared</div>
              </div>
            </div>

            {/* Department Hold Checks */}
            <div style={{ margin: '12px 0', display: 'grid', gap: '6px', fontSize: '0.74rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(141, 226, 201, 0.08)', borderRadius: '4px' }}>
                <span>Lab Equipment Return Status:</span>
                <strong style={{ color: '#8de2c9' }}>0 Items Pending (All Clear)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(141, 226, 201, 0.08)', borderRadius: '4px' }}>
                <span>Programming Project Submission:</span>
                <strong style={{ color: '#8de2c9' }}>Verified · Grade Passed</strong>
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button type="button" className="wf-btn-primary" style={{ flex: 1, padding: '10px' }}>
                <CheckCircle2 size={16} />
                <span>Authorize & Stamp Clearance</span>
              </button>
              <button type="button" className="wf-btn-secondary" style={{ padding: '10px' }}>
                <span>Flag Hold</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: ACE IT Desktop Dashboard
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '14px' }}>
      {/* Sidebar */}
      <div style={{ borderRight: '1px solid rgba(141, 226, 201, 0.16)', paddingRight: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Sparkles size={16} color="var(--ui-accent)" />
          <strong style={{ fontSize: '0.85rem' }}>ACE IT</strong>
        </div>
        <div className="wf-btn-primary" style={{ justifyContent: 'flex-start', fontSize: '0.7rem' }}>
          <BookOpen size={13} />
          <span>My Decks (14)</span>
        </div>
        <div className="wf-btn-secondary" style={{ justifyContent: 'flex-start', fontSize: '0.7rem' }}>
          <Sparkles size={13} />
          <span>AI Generator</span>
        </div>
        <div className="wf-btn-secondary" style={{ justifyContent: 'flex-start', fontSize: '0.7rem' }}>
          <Clock size={13} />
          <span>Study Sessions</span>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(141, 226, 201, 0.14)', fontSize: '0.62rem', color: '#88a99c' }}>
          <span className="wf-status-chip is-cleared" style={{ fontSize: '0.6rem' }}>● Cloud Sync</span>
        </div>
      </div>

      {/* Main Study Hub */}
      <div style={{ display: 'grid', gap: '12px' }}>
        {/* Header & Quick Action */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Study Deck Hub</h4>
            <small style={{ fontSize: '0.7rem', color: '#88a99c' }}>14 custom decks · 3 due for spaced-repetition review</small>
          </div>
          <button type="button" className="wf-btn-primary" style={{ fontSize: '0.7rem' }}>+ Create Deck</button>
        </div>

        {/* AI Quick Generator Prompt Box */}
        <div className="wf-ui-card" style={{ position: 'relative', margin: 0, background: 'rgba(141, 226, 201, 0.06)' }}>
          {showAnnotations && <span className="wf-pin" style={{ top: '-10px', right: '-8px' }}>①</span>}
          <span style={{ fontSize: '0.68rem', color: 'var(--ui-accent)', fontWeight: 600 }}>✦ Instant AI Deck Generation</span>
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <div className="wf-input-box" style={{ flex: 1 }}>
              <Search size={14} />
              <span>Enter lecture topic or paste syllabus notes (e.g. QuickSort & Big-O)...</span>
            </div>
            <button type="button" className="wf-btn-primary" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
              Generate 15 Flashcards ↵
            </button>
          </div>
        </div>

        {/* Decks Grid */}
        <div style={{ position: 'relative' }}>
          {showAnnotations && <span className="wf-pin" style={{ top: '-10px', right: '12px' }}>②</span>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div className="wf-ui-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span className="wf-status-chip is-cleared">Mastered 86%</span>
              <strong style={{ fontSize: '0.76rem', color: '#e2f4ed' }}>CS 311: Data Structures</strong>
              <small style={{ fontSize: '0.65rem', color: '#88a99c' }}>42 active recall flashcards</small>
              <button type="button" className="wf-btn-primary" style={{ width: '100%', marginTop: '6px', fontSize: '0.68rem' }}>
                Study Active Recall ▷
              </button>
            </div>

            <div className="wf-ui-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span className="wf-status-chip is-pending">Mastered 71%</span>
              <strong style={{ fontSize: '0.76rem', color: '#e2f4ed' }}>CS 314: Web Development</strong>
              <small style={{ fontSize: '0.65rem', color: '#88a99c' }}>28 active recall flashcards</small>
              <button type="button" className="wf-btn-primary" style={{ width: '100%', marginTop: '6px', fontSize: '0.68rem' }}>
                Study Active Recall ▷
              </button>
            </div>

            <div className="wf-ui-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span className="wf-status-chip is-cleared">Mastered 92%</span>
              <strong style={{ fontSize: '0.76rem', color: '#e2f4ed' }}>CS 316: Software Eng.</strong>
              <small style={{ fontSize: '0.65rem', color: '#88a99c' }}>35 active recall flashcards</small>
              <button type="button" className="wf-btn-primary" style={{ width: '100%', marginTop: '6px', fontSize: '0.68rem' }}>
                Study Active Recall ▷
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Render Mobile wireframe mockups
function renderMobileWireframe(projectId: string, _screenIdx: number, showAnnotations: boolean) {
  if (projectId === 'project-3') {
    // Check8 Mobile Student Passport
    return (
      <div style={{ display: 'grid', gap: '10px' }}>
        {/* Student Profile Header */}
        <div style={{ borderBottom: '1px solid rgba(141, 226, 201, 0.2)', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ fontSize: '0.82rem' }}>Marco Reyes</strong>
            <div style={{ fontSize: '0.65rem', color: '#88a99c' }}>BSCS 4A · 2023-10492-OC</div>
          </div>
          <span className="wf-status-chip is-cleared" style={{ fontSize: '0.62rem' }}>6/8 Cleared</span>
        </div>

        {/* Digital QR Passport Box */}
        <div className="wf-ui-card" style={{ textAlign: 'center', padding: '12px 8px', margin: 0, position: 'relative' }}>
          {showAnnotations && <span className="wf-pin" style={{ top: '-8px', right: '-6px' }}>②</span>}
          <div style={{ width: '110px', height: '110px', margin: '0 auto 8px', border: '2px solid var(--ui-accent)', borderRadius: '8px', display: 'grid', placeItems: 'center', background: 'rgba(141, 226, 201, 0.08)' }}>
            <QrCode size={64} color="var(--ui-accent)" />
          </div>
          <strong style={{ fontSize: '0.72rem', color: 'var(--ui-accent)' }}>SECURE CLEARANCE TOKEN</strong>
          <p style={{ fontSize: '0.62rem', color: '#88a99c', margin: '2px 0 0' }}>Present this QR code to station signees across campus</p>
        </div>

        {/* 8-Station Checklist */}
        <div style={{ position: 'relative' }}>
          {showAnnotations && <span className="wf-pin" style={{ top: '-10px', right: '-6px' }}>①</span>}
          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#e2f4ed', display: 'block', marginBottom: '4px' }}>Checkpoint Checklist</span>
          <div style={{ display: 'grid', gap: '4px', maxHeight: '180px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 8px', background: '#0e1d18', borderRadius: '3px', fontSize: '0.66rem' }}>
              <span>1. Computer Labs</span>
              <span className="wf-status-chip is-cleared">✓ Cleared</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 8px', background: '#0e1d18', borderRadius: '3px', fontSize: '0.66rem' }}>
              <span>2. University Library</span>
              <span className="wf-status-chip is-cleared">✓ Cleared</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 8px', background: '#0e1d18', borderRadius: '3px', fontSize: '0.66rem' }}>
              <span>3. Student Council</span>
              <span className="wf-status-chip is-pending">⏳ Pending</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 8px', background: '#0e1d18', borderRadius: '3px', fontSize: '0.66rem' }}>
              <span>4. Dean's Office</span>
              <span className="wf-status-chip is-locked">🔒 Locked</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'project-2') {
    // CRHS Web Mobile
    return (
      <div style={{ display: 'grid', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(141, 226, 201, 0.2)', paddingBottom: '6px' }}>
          <strong style={{ fontSize: '0.78rem' }}>Col. Ramon High School</strong>
          <span style={{ fontSize: '0.7rem', color: 'var(--ui-accent)' }}>☰ Menu</span>
        </div>

        <div style={{ background: 'rgba(234, 179, 8, 0.15)', border: '1px solid #eab308', padding: '6px 8px', borderRadius: '4px', fontSize: '0.65rem', color: '#fef08a' }}>
          ⚠️ ADVISORY: Q2 Examination Schedule Released (Nov 12-14)
        </div>

        <div className="wf-ui-card" style={{ margin: 0, padding: '10px' }}>
          <h4 style={{ fontSize: '0.82rem', margin: '0 0 4px' }}>Public School Gateway</h4>
          <p style={{ fontSize: '0.66rem', color: '#88a99c', margin: '0 0 8px' }}>Fast announcements for parents and students on low-bandwidth networks.</p>
          <button type="button" className="wf-btn-primary" style={{ width: '100%', fontSize: '0.68rem', padding: '6px' }}>
            Download Enrollment Form ↵
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          <div className="wf-ui-card" style={{ padding: '8px', margin: 0, fontSize: '0.68rem', textAlign: 'center' }}>
            <Calendar size={14} color="var(--ui-accent)" style={{ margin: '0 auto 2px' }} />
            <strong>Calendar</strong>
          </div>
          <div className="wf-ui-card" style={{ padding: '8px', margin: 0, fontSize: '0.68rem', textAlign: 'center' }}>
            <Phone size={14} color="var(--ui-accent)" style={{ margin: '0 auto 2px' }} />
            <strong>Contact Desk</strong>
          </div>
        </div>
      </div>
    );
  }

  // Default: ACE IT Mobile Study Mode
  return (
    <div style={{ display: 'grid', gap: '10px' }}>
      {/* Study Session Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(141, 226, 201, 0.2)', paddingBottom: '6px' }}>
        <span style={{ fontSize: '0.68rem', color: 'var(--ui-accent)' }}>← Back to Hub</span>
        <span className="wf-status-chip is-cleared" style={{ fontSize: '0.62rem' }}>18 / 42 Cards</span>
      </div>

      {/* 3D Flashcard Canvas */}
      <div className="wf-ui-card" style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'center', margin: 0, position: 'relative' }}>
        {showAnnotations && <span className="wf-pin" style={{ top: '-8px', right: '-6px' }}>②</span>}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="wf-status-chip is-cleared" style={{ fontSize: '0.58rem' }}>QUESTION · CARD #18</span>
          <RotateCw size={12} color="var(--ui-accent)" />
        </div>

        <p style={{ fontSize: '0.76rem', fontWeight: 600, color: '#e2f4ed', margin: '14px 0' }}>
          "What is the worst-case time complexity of QuickSort, and what pivot choice causes it?"
        </p>

        <span style={{ fontSize: '0.62rem', color: '#88a99c', borderTop: '1px dashed rgba(141, 226, 201, 0.2)', paddingTop: '6px' }}>
          [ Tap anywhere to flip card ↺ ]
        </span>
      </div>

      {/* Thumb-Zone Recall Rating Buttons */}
      <div style={{ position: 'relative' }}>
        {showAnnotations && <span className="wf-pin" style={{ top: '-10px', left: '-6px' }}>③</span>}
        <span style={{ fontSize: '0.62rem', color: '#88a99c', display: 'block', textAlign: 'center', marginBottom: '4px' }}>Rate Recall Difficulty:</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          <button type="button" className="wf-btn-secondary" style={{ padding: '8px 4px', fontSize: '0.66rem', borderColor: '#ef4444', color: '#fca5a5' }}>
            🔴 Hard (1d)
          </button>
          <button type="button" className="wf-btn-secondary" style={{ padding: '8px 4px', fontSize: '0.66rem', borderColor: '#eab308', color: '#fef08a' }}>
            🟡 Good (3d)
          </button>
          <button type="button" className="wf-btn-secondary" style={{ padding: '8px 4px', fontSize: '0.66rem', borderColor: '#22c55e', color: '#86efac' }}>
            🟢 Easy (7d)
          </button>
        </div>
      </div>
    </div>
  );
}

console.assert(typeof ProjectWireframes === 'function', 'ProjectWireframes self-check failed');
