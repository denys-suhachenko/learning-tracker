import { PlusIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import type { Module } from '../../model/types';

import ModulesFormItem from './ModulesFormItem';

const ModulesForm = () => {
  const modules: Module[] = [];

  return (
    <>
      <div className="overflow-hidden rounded-md bg-white shadow-sm">
        <div className="divide-y divide-gray-200/70">
          {modules.map((module) => (
            <ModulesFormItem key={module.id} module={module} />
          ))}
        </div>
      </div>

      <Button data-icon="inline-start" className="mt-4">
        <PlusIcon /> Add module
      </Button>
    </>
  );
};

export default ModulesForm;
