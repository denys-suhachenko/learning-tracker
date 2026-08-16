import { Container } from '@/shared/ui/Container';
import { Skeleton } from '@/shared/ui/skeleton';

const DashboardSkeleton = () => {
  return (
    <Container>
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold">Welcome back</h1>
        <p className="text-muted-foreground">
          Track your learning progress and stay on top of reviews.
        </p>
      </header>

      <div className="mb-6 grid grid-cols-4 gap-x-6">
        <Skeleton className="mt-1 h-25 rounded-md bg-gray-200" />
        <Skeleton className="mt-1 h-25 rounded-md bg-gray-200" />
        <Skeleton className="mt-1 h-25 rounded-md bg-gray-200" />
        <Skeleton className="mt-1 h-25 rounded-md bg-gray-200" />
      </div>
    </Container>
  );
};

export default DashboardSkeleton;
