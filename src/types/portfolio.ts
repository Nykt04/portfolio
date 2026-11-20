export interface PortfolioCertification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  description: string;
  image?: string;
}

export interface ProjectPersona {
  name: string;
  role: string;
  demographics: string;
  age?: string;
  education?: string;
  hometown?: string;
  family?: string;
  occupation?: string;
  scenario?: string;
  quote: string;
  goals: string[];
  painPoints: string[];
  techHabits: string[];
}

export interface ProjectRole {
  title: string;
  description: string;
}

export interface CaseStudyDetail {
  overview: {
    product: string;
    targetUsers: string;
    duration: string;
    problem: string;
    goal: string;
    teamContext?: string;
  };
  understanding: {
    researchSummary: string;
    painPoints: { title: string; detail: string }[];
    problemStatement: string;
    journeyMap: {
      stage: string;
      action: string;
      feelings: string;
      painPoints: string;
      opportunities: string;
    }[];
  };
  startingDesign: {
    paperWireframesNote: string;
    lofiPrototype: { description: string; url?: string; image?: string; alt?: string };
    usabilityStudy: {
      intro: string;
      round1: string[];
      round2: string[];
    };
  };
  refiningDesign: {
    mockupsBeforeAfter: {
      title: string;
      notes: string;
      before: string;
      beforeImage?: string;
      beforeAlt?: string;
      beforeWireframe?: 'nav' | 'hero';
      after: string;
      afterImage?: string;
      afterAlt?: string;
    }[];
    mainMockups: (string | { title: string; image?: string; alt?: string })[];
    hifiNote: string;
    accessibilityConsiderations: string[];
  };
  goingForward: {
    impact: string;
    whatILearned: string;
    nextSteps: string[];
  };
}

export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  category: string;
  role: string;
  technologies: string[];
  screenshot: string;
  screenshotAlt: string;
  repository: string;
  liveDemo: string;
  accessNotice?: string;
  caseStudy: string;
  featured: boolean;
  roles?: ProjectRole[];
  persona?: ProjectPersona;
  caseStudyDetail?: CaseStudyDetail;
}

export type ErrorCode = '404' | '403' | '500' | '503';

export interface ErrorDescriptor {
  code: ErrorCode;
  badge: string;
  statusText: string;
  title: string;
  summary: string;
  detail: string;
  hash: string;
}
