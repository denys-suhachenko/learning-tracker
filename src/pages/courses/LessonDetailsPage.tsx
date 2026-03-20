import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { toast } from 'sonner';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

import { Button, Container, PageHeader } from '@/shared/ui';
import { NoteEditor } from '@/widgets';
import {
  useUpdateLessonMutation,
  useGetLessonQuery,
} from '@/features/lessons/api/api';

const LessonDetailsPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState('');

  const { lessonId, courseId } = useParams();
  const { data: lesson } = useGetLessonQuery(lessonId ?? skipToken);
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();

  useEffect(() => {
    setContent(lesson?.content || '');
  }, [lesson?.content]);

  const handleCancel = () => {
    setContent(lesson?.content || '');
    setIsEditMode(false);
  };

  const handleSave = async () => {
    if (isUpdating || !lesson) {
      return;
    }

    try {
      await updateLesson({
        id: lesson.id,
        content,
      }).unwrap();

      toast.success('Lesson saved', {
        description: 'Your changes have been stored successfully.',
      });

      setIsEditMode(false);
    } catch (error) {
      toast.error('Failed to save lesson');
    }
  };

  return (
    <>
      <PageHeader>
        <div className="mb-4">
          <Link
            to={`/courses/${courseId}`}
            className="inline-flex items-center gap-x-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4 shrink-0" />
            Back
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl leading-9 font-semibold">
              {lesson?.title}
            </h1>
            <p className="mt-2 text-base font-medium text-gray-500 dark:text-white/60">
              {lesson?.description}
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            {isEditMode ? (
              <>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button disabled={isUpdating} onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                onClick={() => setIsEditMode((prev) => !prev)}
              >
                Edit Lesson
              </Button>
            )}
          </div>
        </div>
      </PageHeader>

      <Container>
        <div
          className={clsx(
            'grid gap-x-6',
            isEditMode ? 'grid-cols-1' : 'grid-cols-[3fr_1fr]',
          )}
        >
          <NoteEditor
            value={content}
            readOnly={!isEditMode}
            autoFocus={isEditMode}
            onChange={(value) => setContent(value)}
          />

          {!isEditMode && (
            <aside className="sticky top-6 self-start">
              <div className="overflow-hidden rounded-md bg-white px-6 py-4 text-sm shadow-sm dark:bg-gray-800/50 dark:outline dark:outline-white/10">
                <h3 className="mb-4 text-lg font-medium">Table of contents</h3>
                <ol className="space-y-1">
                  <li className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <a href="#">Heading</a>
                  </li>
                </ol>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </>
  );
};

export default LessonDetailsPage;
