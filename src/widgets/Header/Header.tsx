import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const Header = () => {
  return (
    <header className="relative border-b border-gray-300 bg-white shadow-xs">
      <div className="px-12 py-4.5">
        <div className="flex items-center gap-x-2 text-gray-500">
          <MagnifyingGlassIcon className="size-5" />
          <input
            placeholder="Search"
            className="w-64 py-1 text-sm text-black outline-none"
          />
        </div>
      </div>
    </header>
  );
};
