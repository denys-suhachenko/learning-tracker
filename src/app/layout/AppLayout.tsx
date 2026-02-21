import { useState } from 'react';
import { Outlet } from 'react-router';

import { Header, Sidebar } from '@/widgets';

const AppLayout = () => {
  const [sidebarWidth] = useState(256);

  return (
    <>
      <Sidebar />
      <div className="min-h-screen" style={{ paddingLeft: sidebarWidth }}>
        <Header />
        <div className="px-12 py-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
