import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';

import { Button, Container, Input } from '@/shared/ui';
import { useLoginMutation } from '@/features/auth/api/api';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setTokens } from '@/features/auth/model/slice';
import { AppleIcon, GoogleIcon } from '@/shared/icons';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading }] = useLoginMutation();
  const token = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(
        setTokens({
          access: res.access,
          refresh: res.refresh,
        }),
      );
      navigate('/', { replace: true });
    } catch (err) {
      console.log('Login failed: ', err);
    }
  };

  return (
    <Container>
      <div className="flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-96">
          <h2 className="text-center text-2xl font-bold">
            Sign in to your account
          </h2>
        </div>

        <div className="mx-auto mt-8 w-full max-w-md">
          <div className="overflow-hidden rounded-md bg-white p-12 text-sm shadow-sm dark:bg-gray-800/50 dark:text-white dark:outline dark:outline-white/10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="large"
                  className="w-full"
                >
                  Sign in
                </Button>
              </div>
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
              <Link to="/sign-up" className="underline hover:text-gray-900">
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
