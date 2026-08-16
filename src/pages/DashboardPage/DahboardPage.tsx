import React from 'react';
import { Link, useNavigate } from 'react-router';
import {
  AtomIcon,
  BookOpenIcon,
  CalendarClockIcon,
  ChartNoAxesCombinedIcon,
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
import { useGetReviewSummaryQuery } from '@/features/reviews/api/api';
import { Skeleton } from '@/shared/ui/skeleton';
import DashboardSkeleton from '@/features/dashboard/ui/DashboardSkeleton';
import {
  useGetContinueLearningQuery,
  useGetCourseSummaryQuery,
} from '@/features/courses/api/api';

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
  isLoading?: boolean;
}[] = [
  {
    id: '1',
    key: 'activeCourses',
    value: 5,
    count: 2,
    bgClass: 'bg-blue-100',
    icon: <BookOpenIcon className="size-8 text-blue-600" />,
    isLoading: false,
  },
  {
    id: '2',
    key: 'lessonsCompleted',
    value: 28,
    count: formatSignedCount(6),
    bgClass: 'bg-green-100',
    icon: <CircleCheck className="size-8 text-green-600" />,
    isLoading: false,
  },
  {
    id: '3',
    key: 'studyStreak',
    value: 7,
    bgClass: 'bg-violet-100',
    icon: <FlameIcon className="size-8 text-violet-600" />,
    isLoading: false,
  },
  {
    id: '4',
    key: 'reviewsDueToday',
    value: 5,
    bgClass: 'bg-orange-100',
    icon: <ClockIcon className="size-8 text-orange-600" />,
    isLoading: false,
  },
];

const continueLearning: {
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
  const { data: reviewSummary, isLoading: isReviewSummaryLoading } =
    useGetReviewSummaryQuery();
  const { data: continueLearning = [], isLoading: isContinueLearningLoading } =
    useGetContinueLearningQuery();
  const { data: courseSummary, isLoading: isCourseSummaryLoading } =
    useGetCourseSummaryQuery();

  const { user } = useCurrentUser();
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();

  const studyStreak = reviewSummary?.current_streak ?? 0;
  const reviewsDueToday = reviewSummary?.due_today ?? 0;
  const reviewsDueNow = reviewSummary?.due_now ?? 0;

  const dashboardMetrics = metrics.map((metric) => {
    if (metric.key === 'activeCourses') {
      return {
        ...metric,
        value: courseSummary?.active_courses ?? 0,
        count: courseSummary?.courses_in_progress ?? 0,
      };
    }

    if (metric.key === 'lessonsCompleted') {
      return {
        ...metric,
        value: courseSummary?.lessons_completed ?? 0,
        count: formatSignedCount(
          courseSummary?.lessons_completed_this_week ?? 0,
        ),
      };
    }

    if (metric.key === 'studyStreak') {
      return {
        ...metric,
        value: studyStreak,
        isLoading: isReviewSummaryLoading,
      };
    }

    if (metric.key === 'reviewsDueToday') {
      return {
        ...metric,
        value: reviewsDueToday,
        isLoading: isReviewSummaryLoading,
      };
    }

    return metric;
  });

  const isDashboardLoading =
    isReviewSummaryLoading || isContinueLearningLoading;

  if (isDashboardLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <Container>
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-semibold">
            {t('header.greeting', { name: user?.first_name })}
          </h1>
          <p className="text-muted-foreground">{t('header.description')}</p>
        </header>

        <div className="mb-6 grid grid-cols-4 gap-x-6">
          {dashboardMetrics.map((metric) => (
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
                {metric.isLoading ? (
                  <>
                    <Skeleton className="mt-1 h-7 w-10" />
                    <Skeleton className="mt-1 h-3 w-20" />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-semibold">{metric.value}</div>

                    <div className="text-muted-foreground text-xs font-medium">
                      {t(`metrics.${metric.key}.description`, {
                        count: metric.count,
                      })}
                    </div>
                  </>
                )}
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
                {continueLearning.map((course, idx) => (
                  <React.Fragment key={course.id}>
                    <Link
                      to={`/courses/${course.id}`}
                      className="group flex items-center gap-4"
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <div>
                          <div className="block font-medium transition-colors duration-200 group-hover:text-blue-600">
                            {course.title}
                          </div>

                          {course.next_lesson && (
                            <p className="text-muted-foreground mt-1 text-sm font-medium">
                              Next: {course.next_lesson.title}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1 text-right text-xs font-medium">
                          <div>{course.progress}%</div>

                          <Progress value={course.progress} className="w-30" />

                          <div className="text-muted-foreground">
                            {course.completed_lessons} / {course.total_lessons}{' '}
                            lessons
                          </div>
                        </div>
                      </div>
                    </Link>

                    {idx !== continueLearning.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <NotificationsWidget />
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-md border p-4">
              <h2 className="mb-4 text-lg font-medium">
                {t('currentReview.title')}
              </h2>
              <div className="bg-muted flex h-40 items-start gap-x-4 rounded-md border p-4">
                <ClockIcon className="size-8 text-orange-400" />
                <div className="space-y-1">
                  {reviewsDueNow === 0 ? (
                    <div className="text-xl leading-none font-medium">
                      {t('currentReview.done')}
                    </div>
                  ) : (
                    <>
                      <div className="text-sm leading-none font-medium">
                        {t('currentReview.heading')}
                      </div>
                      <div className="text-2xl font-semibold">
                        {reviewsDueNow}
                      </div>
                      <div className="text-muted-foreground text-xs font-medium">
                        {t('currentReview.description')}
                      </div>
                      <Button
                        className="mt-4"
                        disabled={isReviewSummaryLoading || reviewsDueNow === 0}
                        onClick={() => navigate('/review/session')}
                      >
                        {t('currentReview.action')}
                      </Button>
                    </>
                  )}
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
