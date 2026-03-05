import { Button } from '@/shared/ui';
import { topicsList } from '../api/mock';
import { BookOpenIcon } from '@heroicons/react/24/outline';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

const PlannerBoard = () => {
  return (
    <div className="overflow-hidden rounded-lg shadow-sm outline-1 outline-black/5 dark:outline-gray-700">
      <header className="border-b border-gray-200 bg-white px-6 py-4 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            <time dateTime="2026-02-12">March 2026</time>
          </h2>
          <Button size="large">Add topic</Button>
        </div>
      </header>

      <div className="grid max-w-full grid-cols-[256px_1fr] border-b border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white">
        <div className="border-r border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 px-6 py-4 text-sm font-semibold dark:border-gray-700">
            Topics
          </div>
          <div>
            <ul className="h-[680px] divide-y divide-gray-200 overflow-y-auto dark:divide-gray-700">
              {topicsList.map((topic) => (
                <li
                  key={topic.id}
                  className="test-gray-800 px-6 py-4 text-sm font-medium dark:text-white/75"
                >
                  <h3>{topic.title}</h3>
                  <p className="mt-2 flex items-center text-xs text-gray-500 dark:text-white/50">
                    <BookOpenIcon className="mr-2 size-4" />
                    {topic.course}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="grid h-full min-w-[1900px] grid-cols-7 divide-x divide-gray-200 dark:divide-gray-700">
            {DAYS.map((day, i) => (
              <div key={day}>
                <div className="border-b border-gray-200 px-6 py-4 text-center text-sm font-medium text-gray-600 dark:border-gray-700 dark:text-white/75">
                  {day} -{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {i + 9}
                  </span>
                </div>
                <div className="flex h-[680px] flex-col space-y-2 overflow-y-auto p-2">
                  <div className="hover:bg- min-h-[128px] cursor-pointer rounded-lg bg-blue-50 p-2 text-sm select-none hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700/50">
                    <span className="text-sm font-medium text-blue-700 dark:text-white">
                      React.memo pitfalls
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerBoard;
