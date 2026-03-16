import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

import { Sidebar } from '@/widgets';

const AppLayout = () => {
  const [sidebarWidth] = useState(256);

  return (
    <>
      <Sidebar />
      <div className="min-h-screen" style={{ paddingLeft: sidebarWidth }}>
        <ScrollRestoration />
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
