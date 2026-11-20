import { portfolio } from '../data/portfolio';
import type { PortfolioProject } from '../types/portfolio';

export const toolkitTools = portfolio.tools.filter((t) => t.category !== 'IDE & AI');

export function getProjectStackSet(proj: PortfolioProject): Set<string> {
  const matched = new Set<string>();
  const allNames = [...portfolio.skills, ...toolkitTools.map((t) => t.name)];
  for (const tech of proj.technologies) {
    const low = tech.toLowerCase();
    for (const name of allNames) {
      if (low === name.toLowerCase() || low.startsWith(`${name.toLowerCase()} `)) {
        matched.add(name);
      }
    }
  }
  if (proj.caseStudyDetail?.startingDesign.lofiPrototype.url?.includes('figma.com')) {
    matched.add('Figma');
  }
  if (proj.repository || proj.id === 'project-3') {
    matched.add('Git');
    matched.add('GitHub');
  }
  return matched;
}
