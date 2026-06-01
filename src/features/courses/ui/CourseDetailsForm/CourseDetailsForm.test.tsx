import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/api/baseApi';

import CourseDetailsForm from './CourseDetailsForm';

const renderForm = () => {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (gDM) => gDM().concat(baseApi.middleware),
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();

    return (
      <Provider store={store}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(() => {})}>
            {children}
            <button type="submit">submit</button>
          </form>
        </FormProvider>
      </Provider>
    );
  };

  return render(<CourseDetailsForm />, {
    wrapper: Wrapper,
  });
};

describe('CourseDetailsForm', () => {
  it.each(['Course title', 'Course slug', 'Short description', 'Study area'])(
    'renders the %s field',
    (label) => {
      renderForm();

      expect(screen.getByLabelText(label)).toBeInTheDocument();
    },
  );

  it('updates the title field as the user types', async () => {
    const user = userEvent.setup();
    renderForm();

    const titleInput = screen.getByLabelText('Course title');
    await user.type(titleInput, 'My new course');
    expect(titleInput).toHaveValue('My new course');
  });

  it('shows error message when submitting an empty form', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(
      screen.getByRole('button', {
        name: /submit/i,
      }),
    );

    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(await screen.findByText('Slug is required')).toBeInTheDocument();
    expect(
      await screen.findByText('Study area is required'),
    ).toBeInTheDocument();
  });
});
