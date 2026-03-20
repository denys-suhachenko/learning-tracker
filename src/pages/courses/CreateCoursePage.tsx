import { Link } from 'react-router';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Container,
  PageHeader,
} from '@/shared/ui';
import CourseDetailsForm from '@/features/courses/ui/CourseDetailsForm/CourseDetailsForm';
import ModulesForm from '@/features/courses/ui/ModulesForm/ModulesForm';
import { useCreateCourseMutation } from '@/features/courses/api/api';
import type { CreateCourse } from '@/features/courses/model/types';

const CreateCoursePage = () => {
  const [createCourse] = useCreateCourseMutation();

  const course: CreateCourse = {
    title: 'Quantum Mechanics',
    slug: 'quantum-mechanics',
    description: 'Intro course',
    study_area: '3627eff5-329f-42af-9927-d68e833f4aa0',
    status: 'draft',
  };

  const handleSave = async () => {
    try {
      await createCourse(course).unwrap();
      toast.success('Course successfuly created!');
    } catch {
      toast.error("Error! Course hasn't been created");
    }
  };

  return (
    <>
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
            <h1 className="text-3xl leading-9 font-semibold">Create Course</h1>
            <p className="mt-2 text-base font-medium text-gray-500 dark:text-white/60">
              Add a new course, organize modules, and prepare lessons;
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <Button variant="secondary">Save as Draft</Button>
            <Button onClick={handleSave}>Create Course</Button>
          </div>
        </div>
      </PageHeader>

      <Container>
        <div className="grid grid-cols-[3fr_1fr] gap-x-6">
          <div>
            <div className="mb-6">
              <CourseDetailsForm />
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold">Modules & Lessons</h2>
              <ModulesForm />
            </div>
          </div>

          <aside className="sticky top-8 self-start">
            <Card>
              <CardHeader bordered>
                <h3 className="font-medium">Course Preview</h3>
              </CardHeader>
              <CardContent>
                <h2 className="mb-2 text-lg font-medium">
                  Principles of Microeconomics
                </h2>

                <p className="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <AcademicCapIcon className="size-4" />
                  <span>Economics</span>
                </p>

                <ul className="mt-4 space-y-1 border-t border-gray-200 pt-4 text-sm dark:border-gray-700 dark:text-gray-300">
                  <li>
                    Modules:{' '}
                    <span className="font-medium dark:text-white">2</span>
                  </li>
                  <li>
                    Lessons:{' '}
                    <span className="font-medium dark:text-white">4</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Container>
    </>
  );
};

export default CreateCoursePage;
