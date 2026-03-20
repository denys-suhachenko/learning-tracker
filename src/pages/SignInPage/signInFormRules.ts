export const signInFormRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Enter a valid email',
    },
  },
  password: {
    required: 'Password is required',
  },
};
