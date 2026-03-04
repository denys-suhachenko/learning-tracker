import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  return (
    <header className="relative border-b border-gray-300 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between px-12 py-4.5">
        <div className="flex items-center gap-x-2 text-gray-900 dark:text-white">
          <MagnifyingGlassIcon className="size-4" />
          <input
            placeholder="Search"
            className="w-64 py-1 text-sm text-black outline-none dark:text-white"
          />
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
