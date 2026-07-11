import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

const UsersPage = () => {
  const dispatch = useAppDispatch();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl border border-gray-600 p-6">
      <h1 className="mb-4 font-semibold">Users list</h1>
      {/* <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id}>
            <div className="font-medium">{user.name}</div>
            <div>{user.description}</div>
          </li>
        ))}
      </ul> */}
      <div className="mt-4 font-medium">Total: {total}</div>
    </div>
  );
};

export default UsersPage;
