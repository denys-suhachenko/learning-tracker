import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { Multiselect, Table } from '@/shared/ui';

import type { Course, CourseStatus } from '../../model/types';
import { useGetCoursesQuery, useRemoveCourseMutation } from '../../api/api';

import { getColumns, CourseBadge } from './columns';
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
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { Skeleton } from '@/shared/ui/skeleton';
import { Button } from '@/shared/ui/button';
import { QueryState } from '@/shared/ui/QueryState';

type StatusOption = {
  id: number;
  label: string;
  value: CourseStatus;
  color: string;
};

const statuses: StatusOption[] = [
  { id: 1, label: 'Active', value: 'active', color: 'bg-green-400' },
  { id: 3, label: 'Draft', value: 'draft', color: 'bg-gray-400' },
];

const StatusOptionItem = ({ option }: { option: StatusOption }) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className={`h-2 w-2 ${option.color} rounded-full`} />
      {option.label}
    </div>
  );
};

const CoursesTable = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<StatusOption[]>([]);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const navigate = useNavigate();

  const {
    data: courses = [],
    isLoading,
    isError,
    refetch,
  } = useGetCoursesQuery();
  const [removeCourse] = useRemoveCourseMutation();

  const columns = useMemo(
    () =>
      getColumns((id) => {
        const course = courses.find((c) => c.id === id);
        if (course) {
          setCourseToDelete(course);
        }
      }),
    [courses],
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
      <div className="mb-4 flex items-center justify-between">
        <Multiselect
          value={selectedStatuses}
          options={statuses}
          width={220}
          label="Statuses"
          chipTemplate={(val) => <CourseBadge status={val.value} />}
          optionTemplate={(option) => <StatusOptionItem option={option} />}
          onChange={(value) => setSelectedStatuses(value)}
        />

        <Select defaultValue="name">
          <SelectTrigger className="bg-white">
            <span className="font-medium">Sort by:</span>{' '}
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <QueryState
        isLoading={isLoading}
        isError={isError}
        errorMessage="Failed to load courses."
        onRetry={refetch}
        skeleton={
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        }
      >
        {courses.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-muted-foreground text-sm">
              You do not have any courses yet.
            </p>
            <Button onClick={() => navigate('/courses/create')}>
              Create your first course
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
            <AlertDialogTitle>Delete course?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &ldquo;{courseToDelete?.title}
              &rdquo;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              variant="destructive"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CoursesTable;
