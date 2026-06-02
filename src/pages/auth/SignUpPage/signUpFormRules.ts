import type { RegisterOptions } from 'react-hook-form';

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

export const signUpFormRules = {
  name: {},
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
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
} satisfies Record<keyof SignUpFormValues, RegisterOptions<SignUpFormValues>>;
