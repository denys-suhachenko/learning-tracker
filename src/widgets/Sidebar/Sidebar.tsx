import { NavLink } from 'react-router';
import clsx from 'clsx';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

import type { User } from '@/features/auth/model/types';
import { Avatar } from '@/shared/ui';

import useSidebarResize from './hooks/useSidebarResize';
import { navItems } from './navItems';

type SidebarProps = {
  width?: number;
  resizable?: boolean;
  user?: User | null;
  onResize?: (width: number) => void;
};

export const Sidebar = ({
  width = 256,
  resizable = false,
  user = null,
  onResize,
}: SidebarProps) => {
  const { onPointerUp, onPointerMove, onPointerDown, onPointerCancel } =
    useSidebarResize({ value: width, onChange: onResize });

  return (
    <aside
      className="fixed inset-y-0 z-40 w-3xs border-r border-gray-800 bg-gray-900 dark:bg-[oklab(0%_none_none/0.2)]"
      style={{ width }}
    >
      <div className="flex h-full flex-col">
        <a
          href="#"
          className="flex items-center gap-x-3 p-4 text-xl font-semibold tracking-wide text-gray-50 select-none"
        >
          <AcademicCapIcon className="size-8" />
          MindTracker
        </a>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    clsx(
                      'flex cursor-pointer items-center gap-x-3 px-4 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white',
                      isActive ? 'text-white' : 'text-white/70',
                    )
                  }
                >
                  {item.icon} {item.label}
                </NavLink>
              </li>
            ))}

            <li className="mt-auto">
              {user && (
                <div className="flex cursor-pointer items-center gap-x-3 px-4 py-3 text-sm font-medium text-white/70 hover:bg-gray-900 hover:text-white">
                  <Avatar />
                  {user.first_name} {user.last_name}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {resizable && (
        <div
          className="absolute top-0 -right-1 z-50 h-full w-2 cursor-col-resize touch-none border-l-4 border-transparent hover:border-gray-700"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        />
      )}
    </aside>
  );
};
