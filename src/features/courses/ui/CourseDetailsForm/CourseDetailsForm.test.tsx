import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import CourseDetailsForm from './CourseDetailsForm';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../../api/api', () => ({
  useGetStudyAreasQuery: () => ({ data: [] }),
}));

const renderForm = () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          {children}
          <button type="submit">submit</button>
        </form>
      </FormProvider>
    );
  };

  return render(<CourseDetailsForm />, {
    wrapper: Wrapper,
  });
};

describe('CourseDetailsForm', () => {
  it.each([
    'title.label',
    'slug.label',
    'description.label',
    'studyArea.label',
  ])('renders the %s field', (label) => {
    renderForm();

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('updates the title field as the user types', async () => {
    const user = userEvent.setup();
    renderForm();

    const titleInput = screen.getByLabelText('title.label');
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

    expect(
      await screen.findByText('title.validation.required'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('slug.validation.required'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('studyArea.validation.required'),
    ).toBeInTheDocument();
  });

  it('renders the study area select', () => {
    renderForm();

    expect(
      screen.getByRole('combobox', { name: 'studyArea.label' }),
    ).toBeInTheDocument();
  });
});
