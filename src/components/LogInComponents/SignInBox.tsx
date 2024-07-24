import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logInEmail } from '../../services/authService';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import GoogleSignInBox from './GoogleSignUpBox';

export default function SignInForm({
  setMode,
}: {
  setMode: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await logInEmail(email, password);
      navigate('/');
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto min-w-[350px]">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>Enter your information</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setMode('resetPassword')}
                className="mb-4 cursor-pointer underline"
              >
                Forgot your password?
              </span>
            </div>
            <Button onClick={handleLogIn} className="w-full" disabled={loading}>
              {loading ? (
                <svg
                  className="mr-3 inline-block h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                'Login'
              )}
            </Button>
            <GoogleSignInBox />
          </div>
          <p className="mt-4">
            Don't have an account?{' '}
            <span
              className="ml-2 cursor-pointer underline"
              onClick={() => setMode('signup')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
