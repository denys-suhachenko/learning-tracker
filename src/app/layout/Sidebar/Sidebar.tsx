import { Link, NavLink, useNavigate } from 'react-router';
import {
  BrainCircuitIcon,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  LogOutIcon,
  SettingsIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

import { navItems } from './navItems';

type SidebarProps = {
  width?: number;
  collapsed?: boolean;
  resizable?: boolean;
  user?: User | null;
  onResize?: (width: number) => void;
  toggle?: () => void;
};

export const Sidebar = ({
  width = 256,
  collapsed = false,
  user = null,
  toggle,
}: SidebarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('layout', { keyPrefix: 'sidebar' });

  // temporary logout implementation
  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate('/sign-in');
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 z-50 flex flex-col border-r',
        collapsed ? 'w-20' : 'w-3xs',
      )}
      style={{ width }}
    >
      <div className="dark:bg-sidebar flex grow flex-col gap-y-4 overflow-y-auto bg-white px-6">
        <div
          className={cn(
            'flex h-16 items-center border-b',
            collapsed && '-mx-2',
          )}
        >
          <Link to="/" className="flex flex-nowrap items-center gap-x-3">
            <div className="bg-primary text-primary-foreground rounded-md p-2">
              <BrainCircuitIcon className="size-6" />
            </div>
            {!collapsed && (
              <div className="text-lg font-semibold whitespace-nowrap">
                Learning Tracker
              </div>
            )}
          </Link>
        </div>

        <nav className="flex flex-1 flex-col">
          <ul
            role="list"
            className={cn('-mx-2 flex flex-1 list-none flex-col space-y-1')}
          >
            {navItems.map((item) => {
              const { icon: Icon, path, label } = item;
              return (
                <li key={label}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      cn(
                        'flex cursor-pointer flex-nowrap items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors duration-200',
                        'hover:text-accent-foreground hover:bg-accent',
                        isActive
                          ? 'text-accent-foreground bg-accent'
                          : 'text-muted-foreground',
                      )
                    }
                  >
                    <Icon className="size-6" /> {!collapsed && t(label)}
                  </NavLink>
                </li>
              );
            })}

            <li className="-mx-4 mt-auto">
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div
                      className={cn(
                        'hover:bg-muted flex w-full cursor-pointer flex-nowrap items-center justify-start gap-x-3 py-3 text-sm font-medium whitespace-nowrap',
                        collapsed ? 'px-5' : 'px-6',
                      )}
                    >
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="shadcn"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                      {collapsed
                        ? null
                        : `${user.first_name} ${user.last_name}`}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => navigate('/settings')}>
                      <SettingsIcon />
                      {t('settings')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout}>
                      <LogOutIcon />
                      {t('logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
