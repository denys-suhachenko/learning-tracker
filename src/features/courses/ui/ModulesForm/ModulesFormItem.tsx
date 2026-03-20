import { Button, Input } from '@/shared/ui';
import {
  Bars3Icon,
  EllipsisVerticalIcon,
  TrashIcon,
} from '@heroicons/react/16/solid';

import type { Module } from '../../model/types';

type ModulesFormItemProps = {
  module: Module;
};

const ModulesFormItem = ({ module }: ModulesFormItemProps) => {
  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4 select-none">
        <div className="flex w-full items-center">
          <div className="mr-4 cursor-pointer">
            <Bars3Icon className="size-4" />
          </div>

          <div className="w-full">
            <Input
              placeholder="Module title"
              value={module.title}
              readOnly
              className="border-none bg-transparent! p-0! text-base! font-medium outline-none"
            />
            <Input
              placeholder="Module description"
              value={module.description}
              readOnly
              className="mt-1 border-none bg-transparent! p-0! outline-none"
            />
          </div>
        </div>

        <div className="shrink-0">
          <button className="cursor-pointer text-sm font-medium text-gray-400 hover:text-gray-900 dark:text-white/60 dark:hover:text-white">
            <TrashIcon className="size-4" />
          </button>
        </div>
      </div>

      <ul className="divide-y divide-gray-200 border-t border-gray-200/70 bg-gray-50 px-6 dark:divide-white/10 dark:border-white/5 dark:bg-gray-700/25">
        {module.lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="flex items-center justify-between py-4"
          >
            <h3 className="text-sm font-medium">
              {lesson.order}. {lesson.title}
            </h3>
            <button className="cursor-pointer">
              <EllipsisVerticalIcon className="size-4" />
            </button>
          </li>
        ))}

        <li className="py-4">
          <Button variant="secondary">Add lesson</Button>
        </li>
      </ul>
    </div>
  );
};

export default ModulesFormItem;
