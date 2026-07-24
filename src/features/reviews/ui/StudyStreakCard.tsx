import { FlameIcon, ThumbsUpIcon, CheckIcon } from 'lucide-react';

const streak = [
  {
    day: 'Monday',
    label: 'M',
    completed: true,
  },
  {
    day: 'Tuesday',
    label: 'T',
    completed: true,
  },
  {
    day: 'Wednesday',
    label: 'W',
    completed: true,
  },
  {
    day: 'Thursday',
    label: 'T',
    completed: true,
  },
  {
    day: 'Friday',
    label: 'F',
    completed: false,
  },
  {
    day: 'Saturday',
    label: 'S',
    completed: false,
  },
  {
    day: 'Sunday',
    label: 'S',
    completed: false,
  },
];

const StudyStreakCard = () => {
  return (
    <div className="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Study Streak</h3>

      <div className="mb-6 flex items-center gap-x-2">
        <FlameIcon className="size-8 text-orange-500" />
        <span className="text-lg font-semibold">12 days</span>
      </div>

      <div className="mb-4 flex items-center gap-x-2">
        <span className="font-medium">Keep it up!</span>
        <ThumbsUpIcon className="size-5" />
      </div>

      <ul className="flex flex-nowrap items-center justify-between">
        {streak.map((item) => (
          <li
            key={item.day}
            className="flex flex-col justify-center text-center"
          >
            <div className="mb-1 text-sm">{item.label}</div>
            {item.completed ? (
              <div className="flex size-5 items-center justify-center rounded-full bg-green-300">
                <CheckIcon className="size-3" />
              </div>
            ) : (
              <div className="size-5 rounded-full bg-gray-300" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyStreakCard;
