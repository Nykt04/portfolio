import { Award, ExternalLink } from 'lucide-react';
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
          <p>Verified technical coursework and credentials.</p>
        </div>
        <span className="certifications-count" aria-hidden="true">
          <strong>{String(certifications.length).padStart(2, '0')}</strong>
          <span> Credentials</span>
        </span>
      </div>

      <div className="certifications-grid">
        {certifications.map(cert => {
          const tooltip = [cert.title, cert.issuer, cert.date].filter(Boolean).join(' • ');
          return (
            <div
              key={cert.id}
              className="cert-card"
              title={tooltip}
              tabIndex={0}
              role="group"
              aria-label={`${cert.title} — ${cert.issuer}`}
            >
              <Award size={17} className="cert-icon" aria-hidden="true" />
              <span className="cert-title">{cert.title}</span>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-ext-link"
                  aria-label={`Verify ${cert.title} (opens in a new tab)`}
                >
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
