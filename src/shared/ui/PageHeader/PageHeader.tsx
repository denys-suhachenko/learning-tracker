import { Breadcrumbs, type BreadcrumbItem } from '../Breadcrumbs/Breadcrumbs';

type PageHeaderProps = {
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
};

export const PageHeader = ({ breadcrumbs = [], children }: PageHeaderProps) => {
  return (
    <header className="relative border-b border-gray-200/70 bg-white shadow-xs dark:border-gray-800 dark:bg-[oklab(0%_none_none/0.1)] dark:text-white">
      <div className="px-8 py-6">
        {breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {children}
      </div>
    </header>
  );
};
