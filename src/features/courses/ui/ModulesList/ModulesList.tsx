import type { Module } from '../../model/types';

import { ModulesListItem } from './ModulesListItem';

type ModulesListProps = {
  modules?: Module[];
};

export const ModulesList = ({ modules = [] }: ModulesListProps) => {
  return (
    <div className="overflow-hidden rounded-md bg-white shadow-sm dark:bg-gray-800/50 dark:outline dark:outline-white/10">
      {modules?.length ? (
        <div className="divide-y divide-gray-200/70 dark:divide-white/10">
          {modules.map((module) => (
            <ModulesListItem key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <div className="p-6 text-center font-medium text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
          No modules
        </div>
      )}
    </div>
  );
};
