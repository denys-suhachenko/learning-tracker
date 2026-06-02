import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { skipToken } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { BookOpenIcon } from 'lucide-react';

import { PageHeader } from '@/shared/ui';
import { Container } from '@/shared/ui/Container';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { Separator } from '@/shared/ui/separator';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import {
  useCreateLessonMutation,
  useGetLessonQuery,
  useUpdateLessonMutation,
} from '@/features/lessons/api/api';
import type { CreateLesson } from '@/features/lessons/model/types';
import LessonDetailsForm from '@/features/lessons/ui/LessonDetailsForm/LessonDetailsForm';
import { useGetCourseQuery } from '@/features/courses/api/api';

const LessonFormPage = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();

  const isEdit = !!lessonId;
  const methods = useForm<CreateLesson>({
    defaultValues: {
      estimated_minutes: 15,
      module: moduleId,
    },
  });

  const { data: lesson } = useGetLessonQuery(lessonId ?? skipToken);
  const { data: course } = useGetCourseQuery(courseId ?? skipToken);

  const [createLesson, { isLoading: isCreating }] = useCreateLessonMutation();
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();
  const isLoading = isCreating || isUpdating;

  const modules = course?.modules ?? [];

  const title = useWatch({
    control: methods.control,
    name: 'title',
  });

  useEffect(() => {
    if (!lesson || !modules.length) {
      return;
    }

    methods.reset({
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      estimated_minutes: lesson.estimated_minutes,
      module: lesson.module_ref.id,
    });
  }, [lesson, modules.length, methods]);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (isEdit) {
        await updateLesson({ id: lessonId!, ...data }).unwrap();
        toast.success('Lesson updated');
        navigate(`/courses/${courseId}/lessons/${lessonId}`);
      } else {
        await createLesson(data).unwrap();
        toast.success('Lesson created');
        navigate(`/courses/${courseId}`);
      }
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          isEdit ? 'Failed to update lesson' : 'Failed to create lesson',
        ),
      );
    }
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <PageHeader
            title={isEdit ? 'Edit Lesson' : 'Create Lesson'}
            description="Add a new lesson to your module."
            className="mb-8"
            actions={
              <div className="flex items-center gap-x-4">
                <Button
                  asChild
                  variant="outline"
                  type="button"
                  className="bg-white"
                >
                  <Link
                    to={
                      isEdit
                        ? `/courses/${courseId}/lessons/${lessonId}`
                        : `/courses/${courseId}`
                    }
                  >
                    Cancel
                  </Link>
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Save
                </Button>
              </div>
            }
          />

          <div className="grid grid-cols-[2fr_1fr] gap-x-6">
            <LessonDetailsForm modules={modules} />

            <aside className="sticky top-8 self-start">
              <aside className="sticky top-8 self-start">
                <div className="bg-card rounded-md border p-4">
                  <h2 className="mb-4 text-lg font-medium">Lesson Preview</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted flex items-center justify-center rounded-md border p-2">
                        <BookOpenIcon />
                      </div>
                      <div>
                        <div className="text-lg font-medium">
                          {title || 'Lesson Title'}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Short description of the lesson will appear here.
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Status</div>
                        <Badge
                          variant="secondary"
                          className="border border-gray-300"
                        >
                          {isEdit ? lesson?.status : 'Planned'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </aside>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default LessonFormPage;
