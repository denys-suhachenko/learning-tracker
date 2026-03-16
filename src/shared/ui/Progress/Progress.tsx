import clsx from 'clsx';

type ProgressProps = {
  value: number;
  label?: React.ReactNode;
  size?: 'medium' | 'small';
  className?: string;
};

export const Progress = ({
  value,
  label,
  size = 'medium',
  className,
}: ProgressProps) => {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div className="flex w-full items-center">
      <div
        className={clsx(
          'w-full flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-white/20',
          className,
        )}
      >
        <div
          className={clsx(
            'shrink-0 rounded-full bg-blue-600 transition-all duration-300',
            size === 'small' ? 'h-1.5' : 'h-2',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      {label != null && <div className="shrink-0">{label}</div>}
    </div>
  );
};
