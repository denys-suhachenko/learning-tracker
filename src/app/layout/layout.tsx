import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <div className="min-h-screen">
      <div className="px-12 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
