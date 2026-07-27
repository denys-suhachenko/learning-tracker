import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

import { useMeQuery } from '@/features/auth/api/api';

import { Sidebar } from './Sidebar/Sidebar';

const SIDEBAR_COLLAPSED_WIDTH = 72;
const SIDEBAR_EXPANDED_WIDTH = 256;

const AppLayout = () => {
  const [sidebarCollapsed, isSidebarCollapsed] = useState(false);

  const sidebarWidth = sidebarCollapsed
    ? SIDEBAR_COLLAPSED_WIDTH
    : SIDEBAR_EXPANDED_WIDTH;

  const { data: user } = useMeQuery();

  return (
    <>
      <Sidebar
        width={sidebarWidth}
        user={user}
        collapsed={sidebarCollapsed}
        toggle={() => isSidebarCollapsed((prev) => !prev)}
      />
      <div
        className="h-full min-h-screen"
        style={{ paddingLeft: sidebarWidth }}
      >
        <ScrollRestoration />
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
