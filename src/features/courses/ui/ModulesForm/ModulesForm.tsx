import { Button } from '@/shared/ui';

import ModulesFormItem from './ModulesFormItem';

import type { Module } from '../../model/types';

const ModulesForm = () => {
  const modules: Module[] = [];

  return (
    <>
      <div className="overflow-hidden rounded-md bg-white shadow-sm dark:bg-gray-200 dark:outline dark:outline-white/10">
        <div className="divide-y divide-gray-200/70 dark:divide-white/10">
          {modules.map((module) => (
            <ModulesFormItem key={module.id} module={module} />
          ))}
        </div>
      </div>
      <Button className="mt-4">Add module</Button>
    </>
  );
};

export default ModulesForm;
