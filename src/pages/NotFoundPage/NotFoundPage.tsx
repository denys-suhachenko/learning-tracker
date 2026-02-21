import { NavLink } from 'react-router';

const NotFoundPage = () => {
  return (
    <main className="grid min-h-screen w-full place-items-center">
      <div className="text-center">
        <div className="text-3xl font-semibold">404</div>
        <h1 className="mt-4 text-7xl font-semibold text-balance text-gray-900">
          Page not found
        </h1>
        <p className="mt-6 text-2xl font-medium text-pretty text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10">
          <NavLink to="/" className="cursor-pointer font-semibold">
            <span aria-hidden="true">←</span> Back to home
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
