import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';
import { ArrowRightIcon, MicroscopeIcon, PlayIcon } from 'lucide-react';

import { useGetCourseQuery } from '@/features/courses/api/api';
import {
  Card,
  CardContent,
  CardHeader,
  PageHeader,
  Progress,
} from '@/shared/ui';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/layout';
import { Skeleton } from '@/shared/ui/skeleton';
import { QueryState } from '@/shared/ui/QueryState/QueryState';
import CourseModules from '@/features/courses/ui/CourseModules';

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
      <PageHeader
        title={course?.title}
        description={course?.description}
        actions={
          course && (
            <div className="flex items-center gap-x-4">
              <Button
                variant="secondary"
                onClick={() => navigate(`/courses/${course?.id}/edit`)}
              >
                Edit Course
              </Button>
              <Button>Continue Learning</Button>
            </div>
          )
        }
      />

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
          <div className="grid grid-cols-[2fr_1fr] gap-x-6">
            {courseId && (
              <CourseModules courseId={courseId} modules={course?.modules} />
            )}

            <aside className="sticky top-6 space-y-6 self-start">
              <Card className="mb-6">
                <CardHeader bordered className="font-medium">
                  Course details
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="mb-2 flex items-center justify-between font-medium">
                    <div>Overall progress</div>
                    <div>67%</div>
                  </div>

                  <Progress value={67} />

                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center justify-between">
                      <div>Modules:</div>
                      <div className="font-medium">
                        {course?.modules?.length}
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>Lessons:</div>
                      <span className="font-medium">-</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>Completed:</div>
                      <span className="font-medium">-</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-md border bg-indigo-50 p-2 text-indigo-400">
                      <MicroscopeIcon />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm font-medium">
                        Study area
                      </div>
                      <div className="text-sm font-semibold">
                        {course?.study_area?.name}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="font-medium">Next lesson</CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-full border bg-blue-50 p-2 text-blue-400">
                      <PlayIcon fill="currentColor" strokeWidth={0} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        2. Velocity and Speed
                      </div>
                      <div className="text-muted-foreground text-sm font-medium">
                        Kinematics
                      </div>
                    </div>
                  </div>
                  <Link
                    to="#"
                    className="mt-3 flex flex-nowrap items-center gap-x-1 text-sm font-medium text-blue-600"
                  >
                    Continue lesson
                    <ArrowRightIcon className="size-4" />
                  </Link>
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
