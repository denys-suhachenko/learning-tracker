import { NavLink, useNavigate } from 'react-router';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { LogOutIcon, SettingsIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { useAppDispatch } from '@/app/store/hooks';
import type { User } from '@/features/auth/model/types';
import { logout } from '@/features/auth/model/slice';
import { baseApi } from '@/shared/api/baseApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // temporary logout implementation
  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate('/sign-in');
  };

  return (
    <aside
      className="fixed inset-y-0 z-40 w-3xs border-r border-gray-800 bg-gray-900 dark:bg-[oklab(0%_none_none/0.2)]"
      style={{ width }}
    >
      <div className="flex h-full flex-col">
        <a
          href="#"
          className="flex items-center gap-x-3 p-4 text-gray-50 select-none"
        >
          <AcademicCapIcon className="size-8" />
          <div>
            <div className="text-xl font-semibold tracking-wide">
              Learning Tracker
            </div>
            <div className="text-xs font-medium text-gray-200">
              Study. Practice. Progress.
            </div>
          </div>
        </a>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex cursor-pointer items-center gap-x-3 px-4 py-3 text-sm font-medium transition-colors duration-100 hover:bg-gray-900 hover:text-white',
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex w-full cursor-pointer items-center justify-start gap-x-3 px-3 py-4 text-sm font-medium text-white/70 hover:text-white">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="shadcn"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                      {user.first_name} {user.last_name}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => navigate('/settings')}>
                      <SettingsIcon />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout}>
                      <LogOutIcon />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
