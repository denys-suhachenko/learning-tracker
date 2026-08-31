import { cn } from '@/shared/lib/utils';

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
        className={cn(
          'bg-muted w-full flex-1 overflow-hidden rounded-full',
          className,
        )}
      >
        <div
          className={cn(
            'bg-primary shrink-0 rounded-full transition-all duration-300',
            size === 'small' ? 'h-1.5' : 'h-2',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      {label != null && (
        <div className="text-muted-foreground ml-2 shrink-0 text-xs">
          {label}
        </div>
      )}
    </div>
  );
};
