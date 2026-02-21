import { useState } from 'react';
import { Outlet } from 'react-router';

import { Header } from '@/widgets';
import { Sidebar } from '@/widgets/Sidebar/Sidebar';

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
