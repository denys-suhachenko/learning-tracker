import type { Module } from '../../model/types';

import { ModulesListItem } from './ModulesListItem';

type ModulesListProps = {
  modules?: Module[];
  editable?: boolean;
  onRequestDelete?: (module: Module) => void;
};

export const ModulesList = ({
  modules = [],
  editable = false,
  onRequestDelete,
}: ModulesListProps) => {
  return (
    <div className="overflow-hidden rounded-md bg-white shadow-sm">
      {modules?.length ? (
        <div className="divide-y divide-gray-200/70">
          {modules.map((module) => (
            <ModulesListItem
              key={module.id}
              module={module}
              editable={editable}
              onRequestDelete={onRequestDelete}
            />
          ))}
        </div>
      ) : (
        <div className="p-6 text-center font-medium text-gray-500">
          No modules
        </div>
      )}
    </div>
  );
};
