import { useTheme } from '@/shared/hooks/useTheme';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="cursor-pointer text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <SunIcon className="size-6" />
      ) : (
        <MoonIcon className="size-6" />
      )}
    </button>
  );
};
