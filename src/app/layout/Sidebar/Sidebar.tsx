import { Link, NavLink, useNavigate } from 'react-router';
import { BrainCircuitIcon, LogOutIcon, SettingsIcon } from 'lucide-react';

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
      className="fixed inset-y-0 z-40 w-3xs border-r bg-white px-6"
      style={{ width }}
    >
      <div className="flex h-full flex-col gap-y-2">
        <Link to="/" className="flex items-center gap-x-2 py-4 select-none">
          <div className="bg-primary text-primary-foreground rounded-md p-2">
            <BrainCircuitIcon className="size-6" />
          </div>
          <div className="text-xl font-semibold">Learning Tracker</div>
        </Link>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="-mx-2 flex flex-1 flex-col space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex cursor-pointer items-center gap-x-3 rounded-md p-2 text-sm font-medium transition-colors duration-200',
                      'hover:text-accent-foreground hover:bg-accent',
                      isActive
                        ? 'text-accent-foreground bg-accent'
                        : 'text-muted-foreground',
                    )
                  }
                >
                  {item.icon} {item.label}
                </NavLink>
              </li>
            ))}

            <li className="-mx-4 mt-auto">
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="hover:bg-muted flex w-full cursor-pointer items-center justify-start gap-x-3 px-6 py-3 text-sm font-medium">
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
