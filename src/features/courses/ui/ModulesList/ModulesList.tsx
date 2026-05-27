import type { Lesson, Module } from '../../model/types';

import { ModulesListItem } from './ModulesListItem';

type ModulesListProps = {
  modules?: Module[];
  editable?: boolean;
  onRequestDelete?: (module: Module) => void;
  onRequestDeleteLesson?: (lesson: Lesson) => void;
};

export const ModulesList = ({
  modules = [],
  editable = false,
  onRequestDelete,
  onRequestDeleteLesson,
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
              onRequestDeleteLesson={onRequestDeleteLesson}
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
