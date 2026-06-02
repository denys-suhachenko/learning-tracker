import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router';
import { http, HttpResponse } from 'msw';

import { baseApi } from '@/shared/api/baseApi';
import authReducer from '@/features/auth/model/slice';
import { env } from '@/shared/config/env';
import { server } from '@/test/server';

import SignUpPage from './SignUpPage';

const renderSignUpPage = () => {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
    },
    middleware: (gDM) => gDM().concat(baseApi.middleware),
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/sign-up']}>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/" element={<div>Main dashboard page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('SignUpPage', () => {
  it('shows validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();

    renderSignUpPage();

    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('registers a user and redirects to the dashboard', async () => {
    server.use(
      http.post(`${env.apiUrl}/auth/register/`, () => {
        return HttpResponse.json(
          {
            access: 'access-token',
            refresh: 'refresh-token',
          },
          {
            status: 201,
          },
        );
      }),
    );

    const user = userEvent.setup();

    renderSignUpPage();

    await user.type(screen.getByPlaceholderText('Full name'), 'John Doe');
    await user.type(
      screen.getByPlaceholderText('Email address'),
      'test@mail.com',
    );
    await user.type(
      screen.getByPlaceholderText('Password'),
      'Secured_Password_Test',
    );
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText('Main dashboard page')).toBeInTheDocument();
  });

  it('shows backend error when registration fails', async () => {
    server.use(
      http.post(`${env.apiUrl}/auth/register/`, () =>
        HttpResponse.json(
          {
            email: ['user with this email already exists.'],
          },
          {
            status: 400,
          },
        ),
      ),
    );

    const user = userEvent.setup();

    renderSignUpPage();

    await user.type(screen.getByPlaceholderText('Full name'), 'John Doe');
    await user.type(
      screen.getByPlaceholderText('Email address'),
      'existing@mail.com',
    );
    await user.type(
      screen.getByPlaceholderText('Password'),
      'Secured_Password_Test',
    );
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'email: user with this email already exists.',
    );

    expect(screen.queryByText('Main dashboard page')).not.toBeInTheDocument();
  });
});
