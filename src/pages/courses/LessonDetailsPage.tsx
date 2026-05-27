import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';

import { PageHeader } from '@/shared/ui';
import { Container } from '@/shared/layout';
import { NoteEditor, type TocItem } from '@/widgets';
import {
  useUpdateLessonMutation,
  useGetLessonQuery,
} from '@/features/lessons/api/api';
import { Button } from '@/shared/ui/button';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { cn } from '@/shared/lib/utils';
import {
  ChartNoAxesColumnIncreasingIcon,
  CheckIcon,
  ClockIcon,
  NotebookIcon,
  PencilIcon,
} from 'lucide-react';
import { Separator } from '@/shared/ui/separator';

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
        body: {
          ...lesson,
          content: draftContent,
        },
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
              <>
                <Button asChild variant="outline" data-icon="inline-start">
                  <Link to="edit">
                    <PencilIcon />
                    Edit Lesson
                  </Link>
                </Button>
                <Button data-icon="inline-start">
                  <CheckIcon />
                  Mark Complete
                </Button>
              </>
            )}
          </div>
        }
      />

      <Container>
        <div
          className={cn(
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
            <aside className="sticky top-6 space-y-6 self-start">
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

              <div className="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
                <h3 className="mb-4 text-lg font-medium">Lesson info</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-4">
                    <ClockIcon />
                    <div>
                      <div className="text-muted-foreground text-sm">
                        Estimated time
                      </div>
                      <div className="text-sm font-medium">20 minutes</div>
                    </div>
                  </li>
                  <Separator />
                  <li className="flex items-center gap-4">
                    <ChartNoAxesColumnIncreasingIcon />
                    <div>
                      <div className="text-muted-foreground text-sm">
                        Difficulty
                      </div>
                      <div className="text-sm font-medium">Beginner</div>
                    </div>
                  </li>
                  <Separator />
                  <li className="flex items-center gap-4">
                    <NotebookIcon />
                    <div>
                      <div className="text-muted-foreground text-sm">
                        Module
                      </div>
                      <div className="text-sm font-medium">
                        Kinematics Basics
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </>
  );
};

export default LessonDetailsPage;
