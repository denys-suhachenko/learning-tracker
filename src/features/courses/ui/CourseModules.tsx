import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import type { Module } from '../model/types';
import { ModulesList } from './ModulesList/ModulesList';
import { Input } from '@/shared/ui/input';
import { useCreateModuleMutation, useRemoveModuleMutation } from '../api/api';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
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

type CourseModulesProps = {
  courseId: string;
  modules?: Module[];
};

const CourseModules = ({ courseId, modules }: CourseModulesProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);

  const [createModule, { isLoading }] = useCreateModuleMutation();
  const [removeModule] = useRemoveModuleMutation();

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

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Modules</h2>
        <Button variant="ghost" onClick={() => setIsEditMode((mode) => !mode)}>
          {isEditMode ? 'Done' : 'Edit modules'}
        </Button>
      </div>

      <ModulesList
        modules={modules}
        editable={isEditMode}
        onRequestDelete={setModuleToDelete}
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

      {isEditMode && (
        <div className="mt-4 flex items-center gap-x-2">
          <Input
            value={newModuleTitle}
            placeholder="New module title"
            className="bg-white"
            onKeyDown={(e) => e.key === 'Enter' && handleAddModule()}
            onChange={(e) => setNewModuleTitle(e.target.value)}
          />
          <Button disabled={isLoading} onClick={handleAddModule}>
            Add module
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseModules;
