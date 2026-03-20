import { Link, useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

import { useGetCourseQuery } from '@/features/courses/api/api';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  PageHeader,
  Progress,
} from '@/shared/ui';
import { ModulesList } from '@/features/courses/ui/ModulesList/ModulesList';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const { data: course } = useGetCourseQuery(courseId ?? skipToken);

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
          <div className="flex items-center gap-x-4">
            <Button variant="secondary">Edit Course</Button>
            <Button>Continue Learning</Button>
          </div>
        </div>
      </PageHeader>

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

            <Card>
              <CardHeader bordered className="font-medium">
                Attachments
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-x-4 rounded-sm bg-gray-100 px-4 py-2 dark:bg-gray-700">
                    <DocumentTextIcon className="size-6 shrink-0" />
                    <div>
                      <h4 className="max-w-[168px] overflow-hidden text-sm text-ellipsis whitespace-nowrap">
                        Discrete Mathematics and Its Applications.pdf
                      </h4>
                      <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">
                        3.2mb
                      </p>
                    </div>
                  </li>

                  <li className="flex items-center gap-x-4 rounded-sm bg-gray-100 px-4 py-2 dark:bg-gray-700">
                    <DocumentTextIcon className="size-6 shrink-0" />
                    <div>
                      <h4 className="max-w-[168px] overflow-hidden text-sm text-ellipsis whitespace-nowrap">
                        Discrete Mathematics and Its Applications.pdf
                      </h4>
                      <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">
                        3.2mb
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Container>
    </>
  );
};

export default CourseDetailsPage;
