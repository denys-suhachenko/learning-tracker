import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { toast } from 'sonner';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

import { PageHeader } from '@/shared/ui';
import { Container } from '@/shared/layout';
import { NoteEditor, type TocItem } from '@/widgets';
import {
  useUpdateLessonMutation,
  useGetLessonQuery,
} from '@/features/lessons/api/api';
import { Button } from '@/shared/ui/button';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

const LessonDetailsPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [draftContent, setDraftContent] = useState('');
  const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);

  const { lessonId, courseId } = useParams();
  const { data: lesson } = useGetLessonQuery(lessonId ?? skipToken);
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();

  const editorContent = isEditMode ? draftContent : (lesson?.content ?? '');

  const handleEdit = () => {
    setDraftContent(lesson?.content ?? '');
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setDraftContent('');
    setIsEditMode(false);
  };

  const handleSave = async () => {
    if (isUpdating || !lesson) {
      return;
    }

    try {
      await updateLesson({
        id: lesson.id,
        content: draftContent,
      }).unwrap();

      toast.success('Lesson saved', {
        description: 'Your changes have been stored successfully.',
      });

      setIsEditMode(false);
      setDraftContent('');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to save lesson'));
    }
  };

  return (
    <>
      <PageHeader
        title={lesson?.title}
        description={lesson?.description}
        actions={
          isEditMode ? (
            <div className="flex items-center gap-x-4">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button disabled={isUpdating} onClick={handleSave}>
                Save
              </Button>
            </div>
          ) : (
            <Button variant="secondary" onClick={handleEdit}>
              Edit Lesson
            </Button>
          )
        }
      />

      <Container>
        <div
          className={clsx(
            'grid gap-x-6',
            isEditMode ? 'grid-cols-1' : 'grid-cols-[3fr_1fr]',
          )}
        >
          <NoteEditor
            value={editorContent}
            readOnly={!isEditMode}
            autoFocus={isEditMode}
            setToc={setTableOfContents}
            onChange={setDraftContent}
          />

          {!isEditMode && (
            <aside className="sticky top-6 self-start">
              <div className="overflow-hidden rounded-md bg-white px-6 py-4 text-sm shadow-sm">
                <h3 className="mb-4 text-lg font-medium">Table of contents</h3>
                <ol className="space-y-1">
                  {tableOfContents.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        paddingLeft: `${(item.level - 1) * 12}px`,
                      }}
                      className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
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
