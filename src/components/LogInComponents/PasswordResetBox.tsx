import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendPasswordResetEmail } from '../../services/authService'; // Ensure this function is defined
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

interface PasswordResetBoxProps {
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

export default function PasswordResetBox({ setMode }: PasswordResetBoxProps) {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await sendPasswordResetEmail(email);
      setSuccess('Password reset email sent successfully.');
      setTimeout(() => {
        setMode('signin');
      }, 3000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto min-w-[350px]">
      <CardHeader>
        <CardTitle className="text-xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {error && <p className="mb-4 text-red-400">{error}</p>}
          {success && <p className="mb-4 text-green-400">{success}</p>}
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
            <Button
              onClick={handlePasswordReset}
              className="w-full"
              disabled={loading}
            >
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
                'Reset Password'
              )}
            </Button>
          </div>
          <p
            onClick={() => setMode('signin')}
            className="mt-4 cursor-pointer underline"
          >
            Sign In
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
