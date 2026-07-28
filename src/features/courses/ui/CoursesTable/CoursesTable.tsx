import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Trans, useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Table } from '@/shared/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { Skeleton } from '@/shared/ui/skeleton';
import { Button } from '@/shared/ui/button';
import { QueryState } from '@/shared/ui/QueryState/QueryState';

import type { Course } from '../../model/types';
import { useGetCoursesQuery, useRemoveCourseMutation } from '../../api/api';

import { getColumns } from './columns';

const CoursesTable = () => {
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation('courses', { keyPrefix: 'list' });
  const { t: tCol } = useTranslation('courses', {
    keyPrefix: 'list.table.columns',
  });

  const {
    data: courses = [],
    isLoading,
    isError,
    refetch,
  } = useGetCoursesQuery();
  const [removeCourse] = useRemoveCourseMutation();

  const columns = useMemo(
    () =>
      getColumns(tCol, (id) => {
        const course = courses.find((c) => c.id === id);
        if (course) {
          setCourseToDelete(course);
        }
      }),
    [courses, tCol],
  );

  const handleConfirmDelete = async () => {
    if (!courseToDelete) {
      return;
    }

    try {
      await removeCourse(courseToDelete.id).unwrap();
      toast.success('Course deleted');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to delete course'));
    } finally {
      setCourseToDelete(null);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-x-4">
        <Select defaultValue="name">
          <SelectTrigger className="bg-white">
            <span className="font-medium">{t('filter.sortBy.label')}:</span>{' '}
            <SelectValue placeholder={t('filter.sortBy.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">{t('filter.sortBy.name')}</SelectItem>
            <SelectItem value="progress">
              {t('filter.sortBy.progress')}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <QueryState
        isLoading={isLoading}
        isError={isError}
        errorMessage="Failed to load courses."
        onRetry={refetch}
        skeleton={
          <div role="status" aria-label="Loading" className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        }
      >
        {courses.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-muted-foreground text-sm">
              {t('table.emptyList.message')}
            </p>
            <Button onClick={() => navigate('/courses/create')}>
              {t('table.emptyList.action')}
            </Button>
          </div>
        ) : (
          <Table columns={columns} rows={courses} />
        )}
      </QueryState>

      <AlertDialog
        open={!!courseToDelete}
        onOpenChange={(open) => {
          if (!open) {
            setCourseToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('table.alert.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              <Trans
                i18nKey="list.table.alert.description"
                ns="courses"
                values={{
                  title: courseToDelete?.title,
                }}
                components={{
                  bold: <span className="text-primary font-medium" />,
                }}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('table.alert.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              variant="destructive"
            >
              {t('table.alert.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CoursesTable;
