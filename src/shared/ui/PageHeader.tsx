import { cn } from '../lib/utils';
import { Skeleton } from './skeleton';

type PageHeaderProps = {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  isLoading?: boolean;
  skeleton?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export const PageHeader = ({
  title,
  description,
  actions,
  isLoading,
  skeleton,
  className,
  children,
}: PageHeaderProps) => {
  if (isLoading) {
    return (
      <>
        {skeleton ? (
          skeleton
        ) : (
          <div className="px-8">
            <Skeleton className="h-9 w-3xs" />
            <Skeleton className="mt-1 h-5 w-2xs" />
          </div>
        )}
      </>
    );
  }

  return (
    <header>
      <div
        className={cn(
          'flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between',
          className,
        )}
      >
        <div className="min-w-0">
          {children ? (
            <div>{children}</div>
          ) : (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

              {description ? (
                <p className="text-muted-foreground mt-1 text-sm">
                  {description}
                </p>
              ) : null}
            </div>
          )}
        </div>

        {actions ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </header>
  );
};
