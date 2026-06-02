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
    <div className="overflow-hidden rounded-lg shadow-sm outline-1 outline-black/5">
      <header className="border-b border-gray-200 bg-white px-6 py-4 text-gray-900">
        <h2 className="font-semibold">
          <time dateTime="2026-02-12">March 2026</time>
        </h2>
      </header>

      <div className="grid max-w-full grid-cols-[256px_1fr] border-b border-gray-200 bg-white text-gray-900">
        <div className="border-r border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4 text-sm font-semibold">
            Topics
          </div>
          <div>
            <ul className="h-[680px] divide-y divide-gray-200 overflow-y-auto">
              {topicsList.map((topic) => (
                <li
                  key={topic.id}
                  className="test-gray-800 px-6 py-4 text-sm font-medium"
                >
                  <h3>{topic.title}</h3>
                  <p className="mt-2 flex items-center text-xs text-gray-500">
                    <BookOpenIcon className="mr-2 size-4" />
                    {topic.course}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="grid h-full min-w-[1900px] grid-cols-7 divide-x divide-gray-200">
            {DAYS.map((day, i) => (
              <div key={day}>
                <div className="d border-b border-gray-200 px-6 py-4 text-center text-sm font-medium text-gray-600">
                  {day} -{' '}
                  <span className="font-semibold text-gray-900">{i + 9}</span>
                </div>
                <div className="flex h-[680px] flex-col space-y-2 overflow-y-auto p-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerBoard;
