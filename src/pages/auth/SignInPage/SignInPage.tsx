import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router';
import { EyeIcon, EyeOffIcon, LockKeyholeIcon, MailIcon } from 'lucide-react';

import { AppleIcon, GoogleIcon } from '@/shared/icons';
import { Button } from '@/shared/ui/button';
import { Field, FieldError, FieldGroup, FieldSet } from '@/shared/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/input-group';

import { useLoginMutation } from '@/features/auth/api/api';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setTokens } from '@/features/auth/model/slice';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

import RocketBooksImage from '@/assets/rocket_books.webp';

import { signInFormRules, type SignInFormValues } from './signInFormRules';

const SignInPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormValues>();
  const [formError, setFormError] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const onSubmit = async (data: SignInFormValues) => {
    try {
      setFormError(null);

      const res = await login(data).unwrap();

      dispatch(
        setTokens({
          access: res.access,
          refresh: res.refresh,
        }),
      );
    } catch (err) {
      setFormError(getErrorMessage(err, 'Failed to login'));
    }
  };

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden bg-linear-to-br from-[#F7F9FF] via-[#EEF4FF] to-[#E0ECFF] p-12 lg:block">
        <h2 className="text-3xl font-semibold">
          <div className="text-[#172033]">Stay consistent.</div>
          <div className="text-primary">Learn better.</div>
        </h2>
        <p className="mt-4 max-w-1/2 font-medium text-[#5F6B85]">
          Track your lessons, measure progress, and build lasting learning
          habits.
        </p>
        <div className="mt-18 flex h-128 w-full items-center justify-center">
          <img src={RocketBooksImage} alt="" className="max-h-full" />
        </div>
      </div>

      <div className="flex min-h-screen flex-col justify-center bg-white px-6 py-12 sm:px-12 lg:px-32 lg:py-24">
        <h2 className="mb-2 text-center text-3xl font-semibold">
          Welcome back
        </h2>

        <p className="text-muted-foreground mb-8 text-center">
          Continue tracking your learning progress
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup className="gap-4">
              <Field>
                <InputGroup className="h-11 gap-2 px-1 shadow-none">
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    {...register('email', signInFormRules.email)}
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>

              <Field>
                <InputGroup className="h-11 gap-2 px-1 shadow-none">
                  <InputGroupInput
                    id="password"
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    autoComplete="current-password"
                    {...register('password', signInFormRules.password)}
                  />
                  <InputGroupAddon>
                    <LockKeyholeIcon />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => setPasswordVisible((val) => !val)}
                      className="hover:text-foreground cursor-pointer transition-colors duration-200"
                      aria-label={
                        passwordVisible ? 'Hide password' : 'Show password'
                      }
                    >
                      {passwordVisible ? (
                        <EyeOffIcon className="size-5" />
                      ) : (
                        <EyeIcon className="size-5" />
                      )}
                    </button>
                  </InputGroupAddon>
                </InputGroup>
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="h-11 w-full"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>

        {formError && (
          <div
            role="alert"
            className="border-destructive/20 bg-destructive/10 text-destructive mt-4 rounded-md border p-4 text-sm"
          >
            {formError}
          </div>
        )}

        <div className="text-muted-foreground mt-6 flex items-center gap-x-4 text-sm">
          <div className="w-full flex-1 border-t" />
          <div className="text-nowrap">or continue with</div>
          <div className="w-full flex-1 border-t" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button
            className="flex h-11 w-full items-center justify-center gap-x-3 bg-white"
            variant="outline"
            size="lg"
          >
            <GoogleIcon />
            <span className="text-sm font-semibold">Google</span>
          </Button>

          <Button
            className="flex h-11 w-full items-center justify-center gap-x-3 bg-white"
            variant="outline"
            size="lg"
          >
            <AppleIcon />
            <span className="text-sm font-semibold">Apple</span>
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-700">
          Need an account?{' '}
          <Link
            to="/sign-up"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
