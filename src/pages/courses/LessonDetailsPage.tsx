import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { ClockIcon, NotebookIcon, PencilIcon } from 'lucide-react';

import { PageHeader, NoteEditor, type TocItem } from '@/shared/ui';
import { Container } from '@/shared/ui/Container';
import {
  useUpdateLessonMutation,
  useGetLessonQuery,
} from '@/features/lessons/api/api';
import { Button } from '@/shared/ui/button';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { Separator } from '@/shared/ui/separator';
import LessonStatusSelector from '@/features/lessons/ui/LessonStatusSelector/LessonStatusSelector';
import type { LessonStatus } from '@/features/courses/model/types';
import { Skeleton } from '@/shared/ui/skeleton';

const LessonDetailsPage = () => {
  const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);

  const { lessonId } = useParams();
  const { data: lesson, isLoading } = useGetLessonQuery(lessonId ?? skipToken);
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();

  const updateStatus = async (status: LessonStatus) => {
    if (isUpdating || !lesson) {
      return;
    }

    try {
      await updateLesson({ id: lesson.id, status }).unwrap();

      toast.success('Lesson updated', {
        description: 'Lesson status has been updated successfully',
      });
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to update status'));
    }
  };

  return (
    <Container>
      <PageHeader
        title={lesson?.title}
        description={lesson?.description}
        isLoading={isLoading}
        className="mb-8"
        actions={
          <div className="flex items-center gap-x-4">
            <Button
              asChild
              variant="outline"
              data-icon="inline-start"
              className="bg-white"
            >
              <Link to="edit">
                <PencilIcon /> Edit Lesson
              </Link>
            </Button>

            <LessonStatusSelector
              disabled={isUpdating}
              status={lesson?.status ?? 'planned'}
              onChange={updateStatus}
            />
          </div>
        }
      />

      <div className="grid grid-cols-[3fr_1fr] gap-x-6">
        {isLoading ? (
          <div className="overflow-hidden rounded-md bg-white px-6 py-4 text-sm shadow-sm dark:bg-[#1b1c20]">
            <Skeleton className="mb-4 h-12 w-full" />
            <Separator />
            <Skeleton className="mt-4 h-6 w-1/3" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-full" />
            <Skeleton className="mt-1 mb-4 h-4 w-1/2" />
            <Separator />
            <Skeleton className="mt-4 h-8 w-1/2" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-1/3" />
          </div>
        ) : (
          <div className="h-full">
            <NoteEditor
              value={lesson?.content ?? ''}
              mode="preview"
              className="shadow-sm"
              setToc={setTableOfContents}
            />
          </div>
        )}

        <aside className="sticky top-6 space-y-6 self-start">
          <div className="bg-card overflow-hidden rounded-md px-6 py-4 text-sm shadow-sm">
            <h3 className="mb-4 text-lg font-medium">Table of contents</h3>
            {tableOfContents.length ? (
              <ol className="space-y-1">
                {tableOfContents.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      paddingLeft: `${(item.level - 1) * 12}px`,
                    }}
                    className="dark:text-foreground dark:hover:text-foreground/80 cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="text-muted-foreground">
                Table of contents will appear here
              </div>
            )}
          </div>

          <div className="bg-card overflow-hidden rounded-md px-6 py-4 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">Lesson info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-4">
                <ClockIcon />
                <div>
                  <div className="text-muted-foreground text-sm">
                    Estimated time
                  </div>
                  <div className="text-sm font-medium">
                    {lesson?.estimated_minutes ?? 15} minutes
                  </div>
                </div>
              </li>
              <Separator />
              <li className="flex items-center gap-4">
                <NotebookIcon />
                <div>
                  <div className="text-muted-foreground text-sm">Module</div>
                  <div className="text-sm font-medium">
                    {lesson?.module_ref?.title ?? '-'}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
};

export default LessonDetailsPage;
