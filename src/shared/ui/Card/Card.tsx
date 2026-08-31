import clsx from 'clsx';

type CardSectionProps = {
  bordered?: boolean;
  flush?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

type CardContentProps = {
  bordered?: boolean;
  flush?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx('bg-card overflow-hidden rounded-md shadow-sm', className)}
    {...props}
  />
);

export const CardHeader = ({
  bordered,
  className,
  ...props
}: CardSectionProps) => (
  <div
    className={clsx(
      'px-6 py-4',
      bordered && 'border-b border-gray-200 dark:border-white/[0.07]',
      className,
    )}
    {...props}
  />
);

export const CardContent = ({
  flush = false,
  className,
  ...props
}: CardContentProps) => (
  <div
    className={clsx(flush ? 'px-0 py-0' : 'px-6 py-4', className)}
    {...props}
  />
);

export const CardFooter = ({
  bordered,
  className,
  ...props
}: CardSectionProps) => (
  <div
    className={clsx(
      'px-6 py-4',
      bordered && 'border-t border-gray-200 dark:border-white/[0.07]',
      className,
    )}
    {...props}
  />
);
