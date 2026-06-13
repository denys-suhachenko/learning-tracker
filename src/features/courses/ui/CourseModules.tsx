import { useState } from 'react';
import { toast } from 'sonner';
import { Trans, useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
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
import { useRemoveLessonMutation } from '@/features/lessons/api/api';

import type { Lesson, Module } from '../model/types';
import { useCreateModuleMutation, useRemoveModuleMutation } from '../api/api';

import { ModulesList } from './ModulesList/ModulesList';

type CourseModulesProps = {
  courseId: string;
  modules?: Module[];
};

const CourseModules = ({ courseId, modules }: CourseModulesProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDescription, setNewModuleDescription] = useState('');
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);

  const { t } = useTranslation('courses', { keyPrefix: 'details.modules' });

  const [createModule, { isLoading }] = useCreateModuleMutation();
  const [removeModule] = useRemoveModuleMutation();
  const [removeLesson] = useRemoveLessonMutation();

  const handleAddModule = async () => {
    const title = newModuleTitle.trim();

    if (!title) {
      return;
    }

    try {
      await createModule({
        course_id: courseId,
        title,
      }).unwrap();
      setNewModuleTitle('');
      setNewModuleDescription('');
      toast.success('Module added');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to add module'));
    }
  };

  const handleConfirmDelete = async () => {
    if (!moduleToDelete) {
      return;
    }

    try {
      await removeModule(moduleToDelete.id).unwrap();
      toast.success('Module deleted');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to delete module'));
    } finally {
      setModuleToDelete(null);
    }
  };

  const handleConfirmDeleteLesson = async () => {
    if (!lessonToDelete) {
      return;
    }

    try {
      await removeLesson(lessonToDelete.id).unwrap();
      toast.success('Lesson deleted');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to delete lesson'));
    } finally {
      setLessonToDelete(null);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t('title')}</h2>
        <Button variant="ghost" onClick={() => setIsEditMode((mode) => !mode)}>
          {t(isEditMode ? 'actions.done' : 'actions.edit')}
        </Button>
      </div>

      <ModulesList
        modules={modules}
        editable={isEditMode}
        onRequestDelete={setModuleToDelete}
        onRequestDeleteLesson={setLessonToDelete}
      />

      <AlertDialog
        open={!!moduleToDelete}
        onOpenChange={(open) => {
          if (!open) setModuleToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete module?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{' '}
              <span className="font-bold">{moduleToDelete?.title}</span> and all
              its lessons.
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

      <AlertDialog
        open={!!lessonToDelete}
        onOpenChange={(open) => {
          if (!open) setLessonToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteAlert.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              <Trans
                i18nKey="details.modules.deleteAlert.description"
                ns="courses"
                values={{
                  title: lessonToDelete?.title,
                }}
                components={{
                  bold: <span className="text-primary font-medium" />,
                }}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteLesson}
              variant="destructive"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isEditMode && (
        <div className="mt-6 rounded-md border bg-white px-6 py-4 shadow-sm">
          <div className="mb-4 font-medium">{t('createModule.header')}</div>

          <Input
            value={newModuleTitle}
            placeholder={t('createModule.title')}
            className="mb-4 bg-white"
            onChange={(e) => setNewModuleTitle(e.target.value)}
          />

          <Input
            value={newModuleDescription}
            placeholder={t('createModule.description')}
            className="mb-4 bg-white"
            onChange={(e) => setNewModuleDescription(e.target.value)}
          />

          <div className="text-right">
            <Button disabled={isLoading} onClick={handleAddModule}>
              {t('createModule.add')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseModules;
