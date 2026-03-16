import { ChevronRightIcon } from '@heroicons/react/16/solid';

export type BreadcrumbItem = {
  label: React.ReactNode;
  link: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li
            key={`${String(item.label)}-${index}`}
            aria-current={index === items.length - 1 ? 'page' : undefined}
          >
            <div className="flex items-center gap-x-2">
              {index > 0 && (
                <ChevronRightIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-gray-400"
                />
              )}
              {index !== items.length - 1 ? (
                <a
                  href={item.link}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current="page"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
