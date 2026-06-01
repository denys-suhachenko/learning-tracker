import { Button } from '../button';

type QueryStateProps = {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  onRetry?: () => void;
};

export const QueryState = ({
  isLoading,
  isError,
  skeleton,
  children,
  errorMessage = 'Something went wrong',
  onRetry,
}: QueryStateProps) => {
  if (isLoading) {
    return <>{skeleton}</>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <p className="text-muted-foreground text-sm">{errorMessage}</p>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
        )}
      </div>
    );
  }

  return <>{children}</>;
};
