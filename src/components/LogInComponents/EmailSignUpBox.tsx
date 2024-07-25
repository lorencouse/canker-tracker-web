import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signUpEmail, logInEmail } from '../../services/authService';

export const EmailSignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [signUpClicked, setSignUpClicked] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!signUpClicked || name === '') {
      setSignUpClicked(true);
      setError('Please enter remaining fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signUpEmail(email, password);
      navigate('/profile', { state: { editProfile: true, email, name } });
    } catch (error: any) {
      setError(error.message);
    }
  };

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
    <div className="m-auto max-w-lg">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <div
          id="email-fields"
          className="flex flex-row flex-wrap justify-around"
        >
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {signUpClicked && (
          <div className="flex flex-row flex-wrap-reverse justify-around">
            <div>
              <label>Your Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
        )}
        <div className="mx-5">
          <button
            onClick={handleLogIn}
            className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Log In
          </button>
          <button
            onClick={handleSignUp}
            className="m-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
