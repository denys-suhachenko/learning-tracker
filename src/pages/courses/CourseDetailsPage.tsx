import { Link, useNavigate, useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

import { useGetCourseQuery } from '@/features/courses/api/api';
import {
  Card,
  CardContent,
  CardHeader,
  PageHeader,
  Progress,
} from '@/shared/ui';
import { ModulesList } from '@/features/courses/ui/ModulesList/ModulesList';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/layout';
import { useEffect } from 'react';
import { Skeleton } from '@/shared/ui/skeleton';
import { QueryState } from '@/shared/ui/QueryState';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const {
    data: course,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCourseQuery(courseId ?? skipToken);
  const navigate = useNavigate();

  const is404 = error && 'status' in error && error.status === 404;

  useEffect(() => {
    if (is404) {
      navigate('/courses', {
        replace: true,
      });
    }
  }, [is404, navigate]);

  return (
    <>
      <PageHeader>
        <div className="mb-4">
          <Link
            to="/courses"
            className="inline-flex items-center gap-x-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4 shrink-0" />
            Back
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl leading-9 font-semibold">
              {course?.title}
            </h1>
            <p className="mt-2 text-base font-medium text-gray-500 dark:text-white/60">
              {course?.description}
            </p>
          </div>
          {course && (
            <div className="flex items-center gap-x-4">
              <Button
                variant="secondary"
                onClick={() => navigate(`/courses/${course?.id}/edit`)}
              >
                Edit Course
              </Button>
              <Button>Continue Learning</Button>
            </div>
          )}
        </div>
      </PageHeader>

      <QueryState
        isLoading={isLoading}
        isError={isError && !is404}
        errorMessage="Failed to load course."
        onRetry={refetch}
        skeleton={
          <Container>
            <div className="space-y-4 py-8">
              <Skeleton className="h-9 w-1/3" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-40 w-full" />
            </div>
          </Container>
        }
      >
        <Container>
          <h2 className="mb-4 text-xl font-semibold">Lessons</h2>

          <div className="grid grid-cols-[3fr_1fr] gap-x-6">
            <div>
              <ModulesList modules={course?.modules} />
            </div>

            <aside className="sticky top-6 self-start">
              <Card className="mb-6">
                <CardHeader bordered className="font-medium">
                  Course details
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="mb-2 flex items-center justify-between font-medium dark:text-gray-300">
                    <div>In progress</div>
                    <div>67%</div>
                  </div>

                  <Progress value={67} />

                  <ul className="mt-4 space-y-1 dark:text-gray-300">
                    <li>
                      Modules:{' '}
                      <span className="font-medium dark:text-white">
                        {course?.modules?.length}
                      </span>
                    </li>
                    <li>
                      Lessons:{' '}
                      <span className="font-medium dark:text-white">4</span>
                    </li>
                    <li>
                      Completed:{' '}
                      <span className="font-medium dark:text-white">2</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </aside>
          </div>
        </Container>
      </QueryState>
    </>
  );
};

export default CourseDetailsPage;
