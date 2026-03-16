import { Breadcrumbs, type BreadcrumbItem } from '../Breadcrumbs/Breadcrumbs';

type HeaderProps = {
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
};

export const Header = ({ breadcrumbs = [], children }: HeaderProps) => {
  return (
    <header className="relative border-b border-gray-200/70 bg-white shadow-xs dark:border-gray-800 dark:bg-[oklab(0%_none_none/0.1)] dark:text-white">
      {breadcrumbs.length > 0 && (
        <div className="border-b border-gray-200 px-8 py-4 dark:border-gray-800">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}
      <div className="px-8 py-6">{children}</div>
    </header>
  );
};
