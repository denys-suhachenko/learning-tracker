import {
  RefreshCcwIcon,
  CalendarIcon,
  LibraryBigIcon,
  BookAIcon,
  HouseIcon,
} from 'lucide-react';

export const navItems = [
  {
    path: '/',
    label: 'dashboard',
    icon: HouseIcon,
  },
  {
    path: '/courses',
    label: 'courses',
    icon: BookAIcon,
  },
  // {
  //   path: '/planner',
  //   label: 'planner',
  //   icon: CalendarIcon,
  // },
  {
    path: '/review',
    label: 'review',
    icon: RefreshCcwIcon,
  },
  // {
  //   path: '/knowledge-base',
  //   label: 'knowledge_base',
  //   icon: LibraryBigIcon,
  // },
] as const;
