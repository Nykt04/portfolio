import { Award, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { portfolio as p, type PortfolioCertification } from './portfolio';

export default function CertificationsSection() {
  const certifications: PortfolioCertification[] = p.certifications || [];
  if (!certifications.length) return null;

  return (
    <section id="certifications" className="section certifications-section container" aria-labelledby="certifications-title">
      <div className="section-atmosphere atmosphere-certifications" aria-hidden="true">
        <i /><i /><i /><span>05 / CREDENTIALS</span>
      </div>

      <div className="section-heading certifications-heading">
        <div>
          <h2 id="certifications-title">Certifications<span className="accent">.</span></h2>
          <p>Verified technical coursework, certifications, and specialized training.</p>
        </div>
        <span className="certifications-count" aria-hidden="true">
          <strong>{String(certifications.length).padStart(2, '0')}</strong>
          <span> Credentials</span>
        </span>
      </div>

      <div className="certifications-grid">
        {certifications.map(cert => {
          const isPlaceholder = cert.title.startsWith('[');
          return (
            <article key={cert.id} className="cert-card">
              <div className="cert-card-header">
                <div className="cert-badge-wrap" aria-hidden="true">
                  <Award size={26} strokeWidth={1.5} />
                </div>
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date">
                    <Calendar size={13} aria-hidden="true" />
                    <span>{cert.date}</span>
                  </span>
                </div>
              </div>

              <div className="cert-card-body">
                <div className="cert-title-row">
                  <h3>{cert.title}</h3>
                  {isPlaceholder && <span className="status-tag">Placeholder</span>}
                </div>
                <p>{cert.description}</p>
                <div className="cert-skills">
                  {cert.skills.map(skill => (
                    <span key={skill} className="cert-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="cert-card-footer">
                {cert.credentialUrl ? (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert-verify-link">
                    <span>Verify Credential</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="cert-pending-note">
                    <ShieldCheck size={14} aria-hidden="true" />
                    <span>{cert.credentialId ? `ID: ${cert.credentialId}` : 'Verification link to be added'}</span>
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
