import {
  Award,
  BookOpen,
  FolderGit2,
  Github,
  Layers,
  Mail,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  num: string;
  Icon: LucideIcon;
  isCaseLink?: boolean;
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', num: '00', Icon: UserRound },
  { id: 'work', label: 'Work', num: '01', Icon: FolderGit2 },
  { id: 'case-study', label: 'Case Study', num: 'CS', Icon: BookOpen, isCaseLink: true },
  { id: 'about', label: 'About', num: '02', Icon: Users },
  { id: 'toolkit', label: 'Stack', num: '03', Icon: Layers },
  { id: 'certifications', label: 'Certs', num: '04', Icon: Award },
  { id: 'github', label: 'GitHub', num: '05', Icon: Github },
  { id: 'contact', label: 'Contact', num: '06', Icon: Mail },
];

export const allSectionIds = [
  'home',
  'work',
  'about',
  'toolkit',
  'certifications',
  'github',
  'contact',
] as const;
