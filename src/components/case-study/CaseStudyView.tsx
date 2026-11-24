import { useRef, useState } from 'react';
import { defaultFeaturedId, portfolio as p, projects } from '../../data/portfolio';
import { ImageLightbox, type LightboxImage } from '../common/ImageLightbox';
import { CaseStudyForward } from './CaseStudyForward';
import { CaseStudyHeader } from './CaseStudyHeader';
import { CaseStudyOverview } from './CaseStudyOverview';
import { CaseStudyRefiningDesign } from './CaseStudyRefiningDesign';
import { CaseStudyResearch } from './CaseStudyResearch';
import { CaseStudyStartingDesign } from './CaseStudyStartingDesign';

export default function CaseStudyView({ projectId = defaultFeaturedId }: { projectId?: string }) {
  const currentProject = projects.find((item) => item.id === projectId) || projects[0];
  const currentIdx = projects.findIndex((item) => item.id === currentProject.id);
  const nextProject = projects[(currentIdx + 1) % projects.length];
  const currentRoles = currentProject.roles || p.roles;
  const detail = currentProject.caseStudyDetail || projects[0].caseStudyDetail!;

  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = (image: LightboxImage, trigger: HTMLElement) => {
    lightboxTriggerRef.current = trigger;
    setLightbox(image);
  };

  const closeLightbox = () => {
    setLightbox(null);
    const trigger = lightboxTriggerRef.current;
    lightboxTriggerRef.current = null;
    requestAnimationFrame(() => trigger?.focus({ preventScroll: true }));
  };

  return (
    <article id="case-study" className="mx-auto max-w-4xl px-5 pt-12 pb-24 sm:px-8">
      <CaseStudyHeader currentProject={currentProject} allProjects={projects} detail={detail} />

      <div key={currentProject.id} className="mt-12 divide-y divide-[rgb(var(--g200))]">
        <CaseStudyOverview overview={detail.overview} roles={currentRoles} />
        <CaseStudyResearch understanding={detail.understanding} persona={currentProject.persona} />
        <CaseStudyStartingDesign
          projectName={currentProject.name}
          startingDesign={detail.startingDesign}
          onZoom={openLightbox}
        />
        <CaseStudyRefiningDesign refiningDesign={detail.refiningDesign} onZoom={openLightbox} />
        <CaseStudyForward
          currentProject={currentProject}
          nextProject={nextProject}
          goingForward={detail.goingForward}
        />
      </div>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          title={lightbox.title}
          onClose={closeLightbox}
        />
      )}
    </article>
  );
}
