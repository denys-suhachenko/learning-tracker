import React from 'react';
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

import { cn } from '@/shared/lib/utils';
import { useCurrentUser } from '@/shared/hooks';
import { Container } from '@/shared/ui/Container';
import { Separator } from '@/shared/ui/separator';
import { Button } from '@/shared/ui/button';
import { Progress } from '@/shared/ui/progress';
import { useTranslation } from 'react-i18next';
import NotificationsWidget from '@/features/dashboard/ui/NotificationsWidget';

const formatSignedCount = (count: number) =>
  count > 0 ? `+${count}` : `${count}`;

type MetricKey =
  'activeCourses' | 'lessonsCompleted' | 'studyStreak' | 'reviewsDueToday';

type CourseKey = 'classicalMechanics' | 'microeconomics' | 'linearAlgebra';

const metrics: {
  id: string;
  key: MetricKey;
  value: number;
  count?: number | string;
  bgClass: string;
  icon: React.ReactNode;
}[] = [
  {
    id: '1',
    key: 'activeCourses',
    value: 5,
    count: 2,
    bgClass: 'bg-blue-100',
    icon: <BookOpenIcon className="size-8 text-blue-600" />,
  },
  {
    id: '2',
    key: 'lessonsCompleted',
    value: 28,
    count: formatSignedCount(6),
    bgClass: 'bg-green-100',
    icon: <CircleCheck className="size-8 text-green-600" />,
  },
  {
    id: '3',
    key: 'studyStreak',
    value: 7,
    bgClass: 'bg-violet-100',
    icon: <FlameIcon className="size-8 text-violet-600" />,
  },
  {
    id: '4',
    key: 'reviewsDueToday',
    value: 5,
    bgClass: 'bg-orange-100',
    icon: <ClockIcon className="size-8 text-orange-600" />,
  },
];

const courses: {
  id: number;
  key: CourseKey;
  progress: number;
  completed: number;
  total: number;
  bgClass: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 1,
    key: 'classicalMechanics',
    progress: 67,
    completed: 12,
    total: 18,
    bgClass: 'bg-violet-100',
    icon: <AtomIcon className="text-violet-600" />,
  },
  {
    id: 2,
    key: 'microeconomics',
    progress: 42,
    completed: 8,
    total: 19,
    bgClass: 'bg-green-100',
    icon: <ChartNoAxesCombinedIcon className="text-green-600" />,
  },
  {
    id: 3,
    key: 'linearAlgebra',
    progress: 25,
    completed: 5,
    total: 20,
    bgClass: 'bg-orange-100',
    icon: <SigmaIcon className="text-orange-600" />,
  },
];

const DashboardPage = () => {
  const { user } = useCurrentUser();
  const { t } = useTranslation('dashboard');

  return (
    <>
      <Container>
        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold">
            {t('header.greeting', { name: user?.first_name })}
          </h1>
          <p className="text-muted-foreground font-medium">
            {t('header.description')}
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
                <div className="text-sm font-medium">
                  {t(`metrics.${metric.key}.title`)}
                </div>
                <div className="text-2xl font-semibold">{metric.value}</div>
                <div className="text-muted-foreground text-xs font-medium">
                  {t(`metrics.${metric.key}.description`, {
                    count: metric.count,
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-card rounded-md border p-4">
              <h2 className="mb-4 text-lg font-medium">
                {t('continueLearning.title')}
              </h2>
              <div className="space-y-4">
                {courses.map((course, idx) => (
                  <React.Fragment key={course.id}>
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'flex items-center justify-center rounded-md border p-2',
                          course.bgClass,
                        )}
                      >
                        {course.icon}
                      </div>
                      <div className="flex w-full items-center justify-between gap-2">
                        <div>
                          <div className="font-medium">
                            <Link to="/">
                              {t(
                                `continueLearning.courses.${course.key}.title`,
                              )}
                            </Link>
                          </div>
                          <p className="text-muted-foreground mt-1 text-sm font-medium">
                            {t(
                              `continueLearning.courses.${course.key}.description`,
                            )}
                          </p>
                        </div>
                        <div className="space-y-1 text-right text-xs font-medium">
                          <div>{course.progress}%</div>
                          <Progress value={course.progress} className="w-30" />
                          <div className="text-muted-foreground">
                            {t('continueLearning.lessonsProgress', {
                              completed: course.completed,
                              total: course.total,
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    {idx !== courses.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <NotificationsWidget />
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-md border p-4">
              <h2 className="mb-4 text-lg font-medium">
                {t('todaysReview.title')}
              </h2>
              <div className="bg-muted flex items-start gap-x-4 rounded-md border p-4">
                <ClockIcon className="size-8 text-orange-400" />
                <div className="space-y-1">
                  <div className="text-sm leading-none font-medium">
                    {t('todaysReview.heading')}
                  </div>
                  <div className="text-2xl font-semibold">5</div>
                  <div className="text-muted-foreground text-xs font-medium">
                    {t('todaysReview.description')}
                  </div>
                  <Button className="mt-4">{t('todaysReview.action')}</Button>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-md border p-4">
              <h2 className="mb-4 text-lg font-medium">
                {t('upcoming.title')}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <CalendarClockIcon className="size-5 text-blue-600" />
                  <div className="flex w-full items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">
                        <Link to="/">
                          {t('upcoming.items.velocitySpeed.title')}
                        </Link>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs font-medium">
                        {t('upcoming.items.velocitySpeed.context')}
                      </p>
                    </div>
                    <div className="text-muted-foreground text-right text-xs font-medium">
                      <div>{t('upcoming.items.velocitySpeed.day')}</div>
                      <div>{t('upcoming.items.velocitySpeed.time')}</div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <CalendarClockIcon className="size-5 text-blue-600" />
                  <div className="flex w-full items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">
                        <Link to="/">
                          {t('upcoming.items.supplyDemand.title')}
                        </Link>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs font-medium">
                        {t('upcoming.items.supplyDemand.context')}
                      </p>
                    </div>
                    <div className="text-muted-foreground text-right text-xs font-medium">
                      <div>{t('upcoming.items.supplyDemand.day')}</div>
                      <div>{t('upcoming.items.supplyDemand.time')}</div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <CalendarClockIcon className="size-5 text-blue-600" />
                  <div className="flex w-full items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">
                        <Link to="/">
                          {t('upcoming.items.matrixOperations.title')}
                        </Link>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs font-medium">
                        {t('upcoming.items.matrixOperations.context')}
                      </p>
                    </div>
                    <div className="text-muted-foreground text-right text-xs font-medium">
                      <div>{t('upcoming.items.matrixOperations.day')}</div>
                      <div>{t('upcoming.items.matrixOperations.time')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DashboardPage;
