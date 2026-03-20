import { Link } from 'react-router';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Container,
  Progress,
} from '@/shared/ui';
import { useCurrentUser, useTheme } from '@/shared/hooks';

const metrics = [
  {
    id: '1',
    title: 'Lessons left today',
    value: '5',
    subvalue: 'from 8',
  },
  {
    id: '2',
    title: 'Active Courses',
    value: '3',
    subvalue: '',
  },
  {
    id: '3',
    title: 'Finished Courses',
    value: '12',
    subvalue: 'from 54',
  },
  {
    id: '4',
    title: 'This Week Progress',
    value: '66%',
  },
];

const lessons = [
  {
    id: 1,
    title: 'Rules of Differentiation',
    description: 'Sum, product, quotient, and chain rule.',
    status: 'planned',
  },
  {
    id: 2,
    title: 'Creating Memorable Characters',
    description: 'Techniques for character development and growth.',
    status: 'in_progress',
  },
  {
    id: 3,
    title: 'Basic Input and Output',
    description: 'Taking user input and displaying output.',
    status: 'completed',
  },
];

const DashboardPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useCurrentUser();

  return (
    <>
      <Container>
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            Hello, {user?.first_name}! What are your plans for today?
          </h1>

          <button
            onClick={toggleTheme}
            className="cursor-pointer text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-white"
          >
            {theme === 'light' ? (
              <SunIcon className="size-6" />
            ) : (
              <MoonIcon className="size-6" />
            )}
          </button>
        </header>

        <div className="mb-6 grid grid-cols-4 gap-x-6">
          {metrics.map((metric) => (
            <Card key={metric.id}>
              <CardContent>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {metric.title}
                </h4>

                <p className="mt-4">
                  <span className="mr-2 text-3xl font-semibold tracking-tight">
                    {metric.value}
                  </span>

                  {metric.subvalue && (
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      {metric.subvalue}
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-x-6">
          <Card>
            <CardHeader>
              <h3 className="font-medium">Today lessons</h3>
            </CardHeader>

            <CardContent flush>
              <ul className="divide-y divide-gray-200 px-6 pb-4 dark:divide-gray-700">
                {lessons.map((lesson) => (
                  <li key={lesson.id} className="py-2">
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <h3 className="text-sm font-medium">
                          <Link to="/">{lesson.title}</Link>
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {lesson.description}
                        </p>
                      </div>
                      <div className="flex w-1/2 items-center justify-between">
                        <Progress
                          value={60}
                          label={<div className="ml-2 text-xs">60%</div>}
                          size="small"
                          className="max-w-32"
                        />
                        <Badge>{lesson.status}</Badge>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-medium">Notifications</h3>
            </CardHeader>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default DashboardPage;
