import { useTheme } from '@/shared/hooks/useTheme';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="flex w-full cursor-pointer items-center gap-x-3 text-sm font-medium text-white/70 hover:text-white"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <>
          <SunIcon className="size-6" />
          Light
        </>
      ) : (
        <>
          <MoonIcon className="size-6" />
          Dark
        </>
      )}
    </button>
  );
};
