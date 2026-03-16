import { useRef, useState } from 'react';
import { Link } from 'react-router';

import { Badge } from '@/shared/ui';

import { type Module } from '../../model/types';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

type ModulesListitemProps = {
  module: Module;
};

const lessonStatuses = {
  planned: {
    label: 'Planned',
    color: 'gray',
  },
  in_progress: {
    label: 'In Progress',
    color: 'yellow',
  },
  completed: {
    label: 'Completed',
    color: 'green',
  },
} as any;

export const ModulesListItem = ({ module }: ModulesListitemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between px-6 py-4 select-none"
        onClick={() => setIsOpen((val) => !val)}
      >
        <div className="flex items-center">
          <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-sm leading-none font-medium text-white">
            {module.order}
          </div>
          <div>
            <h3 className="font-medium">{module.title}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {module.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-x-8">
          <ChevronDownIcon
            className={clsx(
              'size-5 text-gray-500 transition-transform',
              isOpen ? 'rotate-180' : '',
            )}
          />
        </div>
      </div>

      {
        <div
          ref={panelRef}
          className="overflow-hidden transition-all duration-300"
          style={{
            height: isOpen ? panelRef.current?.scrollHeight : 0,
          }}
        >
          <ul className="divide-y divide-gray-200 border-t border-gray-200/70 bg-gray-50 px-6 dark:divide-white/10 dark:border-white/5 dark:bg-gray-700/25">
            {module.lessons.length > 0 ? (
              module.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="flex items-center justify-between py-4"
                >
                  <h3 className="text-sm font-medium">
                    <Link
                      to={`/courses/${module.course_id}/lessons/${lesson.id}`}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      {lesson.order}. {lesson.title}
                    </Link>
                  </h3>
                  <Badge color={lessonStatuses[lesson.status].color}>
                    {lessonStatuses[lesson.status].label}
                  </Badge>
                </li>
              ))
            ) : (
              <div className="p-4 text-center text-sm font-medium text-gray-500">
                No lessons
              </div>
            )}
          </ul>
        </div>
      }
    </div>
  );
};
