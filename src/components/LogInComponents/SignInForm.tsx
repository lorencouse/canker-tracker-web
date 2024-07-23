import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function SignInForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logInEmail(email, password);
      navigate('/');
    } catch (error: any) {
      setError(error.message);
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
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleLogIn} className="w-full">
              Login
            </Button>
            <GoogleSignInBox />
          </div>
        </div>{' '}
      </CardContent>
    </Card>
  );
}
