import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

import { useMeQuery } from '@/features/auth/api/api';

import { Sidebar } from './Sidebar/Sidebar';

const AppLayout = () => {
  const { data: user } = useMeQuery();
  const [sidebarWidth] = useState(256);

  return (
    <>
      <Sidebar user={user} />
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
