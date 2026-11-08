import { useEffect, useRef, useState } from 'react';
import { Award, ExternalLink, X, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { portfolio as p, type PortfolioCertification } from './portfolio';

export default function CertificationsSection() {
  const certifications: PortfolioCertification[] = p.certifications || [];
  const [activeCert, setActiveCert] = useState<PortfolioCertification | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
        lastTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button inside modal
    modalRef.current?.querySelector<HTMLElement>('button, a')?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeCert]);

  if (!certifications.length) return null;

  const closeModal = () => {
    setActiveCert(null);
    lastTriggerRef.current?.focus();
  };

  return (
    <section id="certifications" className="section certifications-section container" aria-labelledby="certifications-title">
      <div className="section-atmosphere atmosphere-certifications" aria-hidden="true">
        <i /><i /><i /><span>05 / CREDENTIALS</span>
      </div>

      <div className="section-heading certifications-heading">
        <div>
          <h2 id="certifications-title">Certifications<span className="accent">.</span></h2>
          <p>Verified technical coursework and credentials.</p>
        </div>
        <span className="certifications-count" aria-hidden="true">
          <strong>{String(certifications.length).padStart(2, '0')}</strong>
          <span> Credentials</span>
        </span>
      </div>

      <div className="certifications-grid">
        {certifications.map(cert => {
          const tooltip = `Click to view ${cert.title} • ${cert.issuer}`;
          return (
            <button
              type="button"
              key={cert.id}
              className="cert-card"
              title={tooltip}
              aria-haspopup="dialog"
              onClick={e => {
                lastTriggerRef.current = e.currentTarget;
                setActiveCert(cert);
              }}
            >
              <Award size={17} className="cert-icon" aria-hidden="true" />
              <span className="cert-title">{cert.title}</span>
              <span className="cert-view-hint" aria-hidden="true">
                <Eye size={13} />
                <span>View</span>
              </span>
            </button>
          );
        })}
      </div>

      {activeCert && (
        <div
          className="cert-modal-overlay"
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
          role="presentation"
        >
          <div
            className="cert-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-dialog-title"
            ref={modalRef}
          >
            <div className="cert-modal-header">
              <span className="cert-modal-kicker">Verified Technical Credential</span>
              <button
                type="button"
                className="cert-modal-close"
                onClick={closeModal}
                aria-label="Close certificate dialog"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="cert-modal-content">
              {activeCert.image ? (
                <div className="cert-image-frame">
                  <img
                    src={activeCert.image}
                    alt={`${activeCert.title} issued by ${activeCert.issuer}`}
                    className="cert-preview-img"
                  />
                </div>
              ) : (
                <div className="cert-diploma">
                  <div className="cert-diploma-inner">
                    <div className="cert-seal-wrap" aria-hidden="true">
                      <div className="cert-seal-icon">
                        <Award size={34} strokeWidth={1.5} />
                      </div>
                      <span className="cert-seal-text">TECHNICAL MERIT & ACHIEVEMENT</span>
                    </div>

                    <p className="cert-diploma-certifies">This certificate acknowledges that</p>
                    <h3 className="cert-diploma-name">{p.name}</h3>
                    <p className="cert-diploma-subtitle">
                      has successfully demonstrated knowledge and coursework proficiency in
                    </p>
                    <h4 id="cert-dialog-title" className="cert-diploma-title">
                      {activeCert.title}
                    </h4>

                    <p className="cert-diploma-desc">{activeCert.description}</p>

                    <div className="cert-diploma-meta-grid">
                      <div>
                        <span>Issuing Organization</span>
                        <strong>{activeCert.issuer}</strong>
                      </div>
                      <div>
                        <span>Completion Date</span>
                        <strong>{activeCert.date}</strong>
                      </div>
                      <div>
                        <span>Verification Status</span>
                        <strong className="cert-status-verified">
                          <CheckCircle2 size={14} aria-hidden="true" />
                          <span>Verified</span>
                        </strong>
                      </div>
                      {activeCert.credentialId && (
                        <div>
                          <span>Credential ID</span>
                          <code>{activeCert.credentialId}</code>
                        </div>
                      )}
                    </div>

                    {activeCert.skills && activeCert.skills.length > 0 && (
                      <div className="cert-diploma-skills">
                        <span>Associated Competencies:</span>
                        <div className="cert-diploma-tags">
                          {activeCert.skills.map(skill => (
                            <span key={skill} className="cert-skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="cert-modal-footer">
              {activeCert.credentialUrl ? (
                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button primary cert-verify-btn"
                >
                  <span>Verify Credential</span>
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              ) : (
                <span className="cert-modal-pending">
                  <ShieldCheck size={16} aria-hidden="true" />
                  <span>{activeCert.credentialId ? `ID: ${activeCert.credentialId}` : 'Digital credential ready for verification link'}</span>
                </span>
              )}
              <button
                type="button"
                className="button secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
