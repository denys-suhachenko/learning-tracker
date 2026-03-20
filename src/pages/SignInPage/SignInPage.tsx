import { Link, Navigate, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import { Button, Container, Input } from '@/shared/ui';
import { AppleIcon, GoogleIcon } from '@/shared/icons';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useLoginMutation } from '@/features/auth/api/api';
import { setTokens } from '@/features/auth/model/slice';

import { signInFormRules } from './signInFormRules';

type SignInFormValues = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.accessToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const res = await login(data).unwrap();
      dispatch(
        setTokens({
          access: res.access,
          refresh: res.refresh,
        }),
      );
      navigate('/', { replace: true });
    } catch (error) {
      console.log('Login failed!', error);
    }
  };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <div className="flex h-full flex-col justify-center">
        <div className="mx-auto mt-8 w-full max-w-md">
          <div className="overflow-hidden rounded-md bg-white px-10 py-8 text-sm shadow-sm dark:bg-gray-800/50 dark:text-white dark:outline dark:outline-white/10">
            <h2 className="mb-6 text-center text-2xl font-bold">
              Sign in to your account
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                autoComplete="off"
                description={errors.email?.message}
                {...register('email', signInFormRules.email)}
              />

              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="Enter a unique password"
                autoComplete="off"
                description={errors.password?.message}
                {...register('password', signInFormRules.password)}
              />

              <Button
                type="submit"
                disabled={isLoading}
                size="large"
                className="w-full"
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6">
              <div className="flex items-center gap-x-4">
                <div className="w-full flex-1 border-t border-gray-200 dark:border-gray-700" />
                <div className="font-medium text-nowrap">Or continue with</div>
                <div className="w-full flex-1 border-t border-gray-200 dark:border-gray-700" />
              </div>

              <div className="mt-6 space-y-4">
                <Button
                  className="flex w-full items-center justify-center gap-x-3"
                  disabled={true}
                  variant="secondary"
                  size="large"
                >
                  <GoogleIcon />
                  <span className="text-sm font-semibold">Google</span>
                </Button>

                <Button
                  className="flex w-full items-center justify-center gap-x-3"
                  disabled={true}
                  variant="secondary"
                  size="large"
                >
                  <AppleIcon />
                  <span className="text-sm font-semibold">Apple</span>
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
              Need an account?{' '}
              <Link
                to="/sign-up"
                className="underline hover:text-gray-900 dark:hover:text-white"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignInPage;
