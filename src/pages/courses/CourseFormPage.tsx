import { Link, useNavigate, useParams } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { BookOpenIcon, CircleCheckIcon, LightbulbIcon } from 'lucide-react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

import { PageHeader } from '@/shared/ui';
import CourseDetailsForm from '@/features/courses/ui/CourseDetailsForm/CourseDetailsForm';
import ModulesForm from '@/features/courses/ui/ModulesForm/ModulesForm';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/layout';
import { Separator } from '@/shared/ui/separator';
import { Badge } from '@/shared/ui/badge';
import type { CreateCourse } from '@/features/courses/model/types';
import {
  useCreateCourseMutation,
  useGetCourseQuery,
  useGetStudyAreasQuery,
  useUpdateCourseMutation,
} from '@/features/courses/api/api';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { cn } from '@/shared/lib/utils';
import { useEffect } from 'react';

const CourseFormPage = () => {
  const methods = useForm<CreateCourse>();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { data: studyAreas = [] } = useGetStudyAreasQuery();
  const { data: course } = useGetCourseQuery(courseId!, { skip: !courseId });

  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  const isEdit = !!courseId;

  const isLoading = isCreating || isUpdating;

  const title = methods.watch('title');
  const slug = methods.watch('slug');
  const studyAreaId = methods.watch('study_area');
  const description = methods.watch('description');
  const studyAreaName = studyAreas.find(
    (area) => area.id === studyAreaId,
  )?.name;

  const checklist = [
    {
      label: 'Add a course title',
      done: !!title,
    },
    {
      label: 'Add a course slug',
      done: !!slug,
    },
    {
      label: 'Add a short description',
      done: !!description,
    },
    {
      label: 'Select a study area',
      done: !!studyAreaId,
    },
    {
      label: 'Add at least one module',
      done: false,
    },
    {
      label: 'Add at least one lesson',
      done: false,
    },
  ];

  useEffect(() => {
    if (!course) {
      return;
    }

    methods.reset({
      title: course.title,
      slug: course.slug,
      description: course.description,
      study_area: course.study_area?.id,
      status: course.status,
    });
  }, [course, methods]);

  const onSubmit = (status: 'draft' | 'active') =>
    methods.handleSubmit(async (data) => {
      try {
        if (isEdit) {
          await updateCourse({
            id: courseId!,
            body: { ...data, status },
          }).unwrap();
          toast.success('Course updated');
        } else {
          await createCourse({ ...data, status }).unwrap();
          toast.success('Course created');
        }
        navigate('/courses');
      } catch (err) {
        toast.error(
          getErrorMessage(
            err,
            isEdit ? 'Failed to update course' : 'Failed to create course',
          ),
        );
      }
    });

  return (
    <FormProvider {...methods}>
      <form>
        <PageHeader>
          <div className="mb-4">
            <Link
              to="/courses"
              replace
              className="inline-flex items-center gap-x-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ArrowLeftIcon aria-hidden="true" className="size-4 shrink-0" />
              Back
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl leading-9 font-semibold">
                {isEdit ? 'Edit Course' : 'Create Course'}
              </h1>
              <p className="mt-2 text-base font-medium text-gray-500 dark:text-white/60">
                Add a new course, organize modules, and prepare lessons;
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              {!isEdit && (
                <Button
                  variant="secondary"
                  disabled={isLoading}
                  onClick={onSubmit('draft')}
                >
                  Save as Draft
                </Button>
              )}
              <Button disabled={isLoading} onClick={onSubmit('active')}>
                {isEdit ? 'Save changes' : 'Create Course'}
              </Button>
            </div>
          </div>
        </PageHeader>

        <Container>
          <div className="grid grid-cols-[2fr_1fr] gap-x-6">
            <div>
              <div className="mb-6">
                <CourseDetailsForm />
              </div>

              <div>
                <h2 className="text-lg font-medium">Modules & Lessons</h2>
                <p className="text-muted-foreground text-sm font-medium">
                  Add modules and lessons to build your course structure.
                </p>
                <ModulesForm />
              </div>
            </div>

            <aside className="sticky top-8 self-start">
              <div className="bg-card rounded-md border p-4">
                <h2 className="mb-4 text-lg font-medium">Course Preview</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted flex items-center justify-center rounded-md border p-2">
                      <BookOpenIcon />
                    </div>
                    <div>
                      <div className="text-lg font-medium">
                        {title || 'Course Title'}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {studyAreaName || 'Category'}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center justify-between">
                      <div>Modules</div>
                      <div className="font-medium">-</div>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>Lessons</div>
                      <div className="font-medium">-</div>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>Est. duration</div>
                      <div className="font-medium">-</div>
                    </li>
                  </ul>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Status</div>
                      <Badge
                        variant="secondary"
                        className="border border-gray-300"
                      >
                        Draft
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-sm font-medium">Ready to publish</div>
                  <ul className="space-y-1 text-sm">
                    {checklist.map((item) => (
                      <li
                        key={item.label}
                        className={cn(
                          'flex items-center gap-x-2',
                          item.done
                            ? 'text-green-600'
                            : 'text-muted-foreground',
                        )}
                      >
                        <CircleCheckIcon className="size-4" /> {item.label}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-muted flex items-center gap-4 rounded-md border p-2">
                    <div className="text-blue-00 rounded-md border border-blue-200 bg-blue-100 p-2">
                      <LightbulbIcon />
                    </div>
                    <div className="text-muted-foreground text-xs font-medium">
                      Tip: A clear structure helps learners stay focused and
                      engaged.
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </form>
    </FormProvider>
  );
};

export default CourseFormPage;
