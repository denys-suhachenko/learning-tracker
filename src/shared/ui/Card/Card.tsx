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
    className={clsx(
      'overflow-hidden rounded-md bg-white shadow-sm dark:bg-gray-800/50 dark:outline dark:outline-white/10',
      className,
    )}
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
      bordered && 'border-b border-gray-200 dark:border-gray-700',
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
      bordered && 'border-t border-gray-200 dark:border-gray-700',
      className,
    )}
    {...props}
  />
);
