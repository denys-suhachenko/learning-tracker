import type { RegisterOptions } from 'react-hook-form';

export type SignInFormValues = {
  email: string;
  password: string;
};

export const signInFormRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email',
    },
    setValueAs: (value: string) => value.trim(),
  },
  password: {
    required: 'Password is required',
  },
} satisfies Record<keyof SignInFormValues, RegisterOptions<SignInFormValues>>;
