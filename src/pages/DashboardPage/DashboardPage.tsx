import { Badge, Container, Progress } from '@/shared/ui';
import { Link } from 'react-router';

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
  return (
    <>
      <Container>
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">
            Hello! What are your plans for today?
          </h1>
        </header>

        <div className="mb-6 grid grid-cols-4 gap-0 divide-x divide-gray-200 overflow-hidden rounded-md bg-white shadow-sm outline outline-gray-200 dark:divide-gray-700 dark:bg-gray-800 dark:text-white dark:outline-gray-700">
          {metrics.map((metric) => (
            <div key={metric.id} className="px-6 py-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                {metric.title}
              </p>
              <p className="mt-2">
                <span className="mr-2 text-3xl font-semibold tracking-tight">
                  {metric.value}
                </span>
                {metric.subvalue && (
                  <span className="font-medium text-gray-600 dark:text-gray-400">
                    {metric.subvalue}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-x-6">
          <div className="rounded-md bg-white px-6 py-4 shadow-sm outline outline-gray-200 dark:bg-gray-800 dark:text-white dark:outline-gray-700">
            <h3 className="mb-4 font-medium">Today lessons</h3>

            <div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
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
            </div>
          </div>

          <div className="rounded-md bg-white px-8 py-6 shadow-sm outline outline-gray-200 dark:bg-gray-800 dark:text-white dark:outline-gray-700">
            <h3 className="mb-4 font-medium">Notifications</h3>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DashboardPage;
