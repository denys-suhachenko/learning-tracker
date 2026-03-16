import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';

import { Button, Container, Header } from '@/shared/ui';
import { NoteEditor } from '@/widgets';
import {
  useUpdateLessonMutation,
  useGetLessonQuery,
} from '@/features/lessons/api/api';
import clsx from 'clsx';

const LessonPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState('');

  const { lessonId } = useParams();
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

      setIsEditMode(false);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <>
      <Header>
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
      </Header>

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

export default LessonPage;
