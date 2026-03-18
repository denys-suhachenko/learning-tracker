import { useMatches } from 'react-router';

import type { BreadcrumbItem } from '../ui/Breadcrumbs/Breadcrumbs';

type BreadcrumbHandle = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  breadcrumb?: (match: any) => BreadcrumbItem;
};

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const matches = useMatches();

  return matches.reduce<BreadcrumbItem[]>((res, match) => {
    const breadcrumb = (match.handle as BreadcrumbHandle | undefined)
      ?.breadcrumb;
    if (breadcrumb) {
      res.push(breadcrumb(match));
    }
    return res;
  }, []);
};
