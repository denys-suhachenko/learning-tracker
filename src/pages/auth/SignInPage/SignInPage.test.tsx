import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router';

import { baseApi } from '@/shared/api/baseApi';
import authReducer from '@/features/auth/model/slice';
import { env } from '@/shared/config/env';

import SignInPage from './SignInPage';
import { server } from '@/test/server';
import { http, HttpResponse } from 'msw';

const renderSignInPage = () => {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
    },
    middleware: (gDM) => gDM().concat(baseApi.middleware),
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/sign-in']}>
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/" element={<div>Main dashboard page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('SignInPage', () => {
  it('shows validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();

    renderSignInPage();

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('logs in and redirects to the dashboard', async () => {
    server.use(
      http.post(`${env.apiUrl}/auth/login/`, () => {
        console.log('LOGIN HANDLER CALLED');
        return HttpResponse.json({
          access: 'access-token',
          refresh: 'refresh-token',
        });
      }),
    );

    const user = userEvent.setup();

    renderSignInPage();

    await user.type(
      screen.getByPlaceholderText('Email address'),
      'test@mail.com',
    );
    await user.type(
      screen.getByPlaceholderText('Password'),
      'Secured_Password_Test',
    );
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Main dashboard page')).toBeInTheDocument();
  });

  it('shows backend error when login fails', async () => {
    server.use(
      http.post(`${env.apiUrl}/auth/login/`, () =>
        HttpResponse.json(
          {
            detail: 'Invalid credentials',
          },
          {
            status: 401,
          },
        ),
      ),
    );

    const user = userEvent.setup();

    renderSignInPage();

    await user.type(
      screen.getByPlaceholderText('Email address'),
      'test@mail.com',
    );
    await user.type(
      screen.getByPlaceholderText('Password'),
      'Secured_Password_Test',
    );
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Invalid credentials',
    );
    expect(screen.queryByText('Main dashboard page')).not.toBeInTheDocument();
  });
});
