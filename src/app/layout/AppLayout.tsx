import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { Toaster } from 'sonner';

import { Sidebar } from '@/widgets';
import { useMeQuery } from '@/features/auth/api/api';

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
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              success:
                '!bg-emerald-600 !text-white !border-emerald-600 !text-sm',
              error: '!bg-red-600 !text-white !border-red-600 !text-sm',
              description: '!text-gray-200',
            },
            duration: 2000,
          }}
        />
      </div>
    </>
  );
};

export default AppLayout;
