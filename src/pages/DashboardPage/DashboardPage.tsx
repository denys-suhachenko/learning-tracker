import { Link } from 'react-router';
import {
  AtomIcon,
  BookOpenIcon,
  CalendarClockIcon,
  ChartNoAxesCombinedIcon,
  CheckIcon,
  CircleCheck,
  ClockIcon,
  FlameIcon,
  SigmaIcon,
} from 'lucide-react';

import { useCurrentUser } from '@/shared/hooks';
import { Container } from '@/shared/layout';
import { cn } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';
import { Button } from '@/shared/ui/button';
import React from 'react';

const metrics = [
  {
    id: '1',
    title: 'Active Courses',
    value: 5,
    description: '2 in progress',
    bgClass: 'bg-blue-100',
    icon: <BookOpenIcon className="size-8 text-blue-600" />,
  },
  {
    id: '2',
    title: 'Lessons Completed',
    value: 28,
    description: '+6 this week',
    bgClass: 'bg-green-100',
    icon: <CircleCheck className="size-8 text-green-600" />,
  },
  {
    id: '3',
    title: 'Study Streak',
    value: 7,
    description: 'days in a row',
    bgClass: 'bg-violet-100',
    icon: <FlameIcon className="size-8 text-violet-600" />,
  },
  {
    id: '4',
    title: 'Reviews Due Today',
    value: 5,
    description: 'Stay consistent',
    bgClass: 'bg-orange-100',
    icon: <ClockIcon className="size-8 text-orange-600" />,
  },
];

const lessons = [
  {
    id: 1,
    title: 'Classical Mechanics Fundamentals',
    description: 'An introductory course on motion, forces, and energy.',
    progress: 67,
    bgClass: 'bg-violet-100',
    icon: <AtomIcon className="text-violet-600" />,
  },
  {
    id: 2,
    title: 'Principles of Microeconomics',
    description: 'Explore how markets work and decisions are made.',
    progress: 42,
    bgClass: 'bg-green-100',
    icon: <ChartNoAxesCombinedIcon className="text-green-600" />,
  },
  {
    id: 3,
    title: 'Linear Algebra Essentials',
    description: 'Vectors, matrices, and linear transformations.',
    progress: 25,
    bgClass: 'bg-orange-100',
    icon: <SigmaIcon className="text-orange-600" />,
  },
];

const DashboardPage = () => {
  const { user } = useCurrentUser();

  return (
    <>
      <Container>
        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold">
            Hello, {user?.first_name}! What are your plans for today?
          </h1>
          <p className="text-muted-foreground font-medium">
            Track your learning progress and stay on top of reviews.
          </p>
        </header>

        <div className="mb-6 grid grid-cols-4 gap-x-6">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-card flex items-center gap-x-4 rounded-md border p-4"
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-md border p-4',
                  metric.bgClass,
                )}
              >
                {metric.icon}
              </div>
              <div>
                <div className="text-sm font-medium">{metric.title}</div>
                <div className="text-2xl font-semibold">{metric.value}</div>
                <div className="text-muted-foreground text-xs font-medium">
                  {metric.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-card rounded-md border p-4">
              <h2 className="mb-4 text-lg font-medium">Continue Learning</h2>
              <div className="space-y-4">
                {lessons.map((lesson, idx) => (
                  <React.Fragment key={lesson.id}>
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'flex items-center justify-center rounded-md border p-2',
                          lesson.bgClass,
                        )}
                      >
                        {lesson.icon}
                      </div>
                      <div>
                        <div className="font-medium">
                          <Link to="/">{lesson.title}</Link>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm font-medium">
                          {lesson.description}
                        </p>
                      </div>
                    </div>
                    {idx !== lessons.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-md border p-4">
              <h2 className="mb-4 text-lg font-medium">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex w-full items-center gap-4">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-700 text-white">
                    <CheckIcon className="size-4" />
                  </div>
                  <div className="flex w-full items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">
                        <Link to="/">
                          Completed lesson: 1. Position, Distance, and
                          Displacement
                        </Link>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs font-medium">
                        Classical Mechanics Fundamentals
                      </p>
                    </div>
                    <div className="text-muted-foreground text-xs font-medium">
                      2 hours ago
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-sm border bg-violet-100 text-violet-700">
                    <BookOpenIcon className="size-5" />
                  </div>
                  <div className="flex w-full items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">
                        <Link to="/">Reviewed 12 items</Link>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs font-medium">
                        Principles of Microeconomics
                      </p>
                    </div>
                    <div className="text-muted-foreground text-xs font-medium">
                      Yesterday
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-700 text-white">
                    <CheckIcon className="size-4" />
                  </div>
                  <div className="flex w-full items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">
                        <Link to="/">
                          Completed lesson: Introduction to Vectors
                        </Link>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs font-medium">
                        Linear Algebra Essentials
                      </p>
                    </div>
                    <div className="text-muted-foreground text-xs font-medium">
                      2 days ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-md border p-4">
              <h2 className="mb-4 text-lg font-medium">Today's Review</h2>
              <div className="bg-muted flex items-start gap-x-4 rounded-md border p-4">
                <ClockIcon className="size-8 text-orange-400" />
                <div className="space-y-1">
                  <div className="text-sm leading-none font-medium">
                    You have reviews due today
                  </div>
                  <div className="text-2xl font-semibold">5</div>
                  <div className="text-muted-foreground text-xs font-medium">
                    Keep your knowledge fresh and stay on track.
                  </div>
                  <Button className="mt-4">Start Review</Button>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-md border p-4">
              <h2 className="mb-4 text-lg font-medium">Upcoming</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div>
                    <CalendarClockIcon className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      <Link to="/">2. Velocity and Speed</Link>
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs font-medium">
                      Classical Mechanics Fundamentals
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div>
                    <CalendarClockIcon className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      <Link to="/">Supply and Demand</Link>
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs font-medium">
                      Principles of Microeconomics
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div>
                    <CalendarClockIcon className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      <Link to="/">Matrix Operations</Link>
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs font-medium">
                      Linear Algebra Essentials
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-[2fr_1fr] gap-x-6">
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
        </div> */}
      </Container>
    </>
  );
};

export default DashboardPage;
