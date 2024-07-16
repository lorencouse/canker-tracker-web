// src/Pages/SignIn.tsx
import type React from 'react';

import { EmailSignUp } from '../../components/LogInComponents/EmailSignUpBox';
import { FacebookSigninBox } from '../../components/LogInComponents/FaceBookSignInBox';
import { GoogleSignInBox } from '../../components/LogInComponents/GoogleSignUpBox';

const SignIn: React.FC = () => {
  return (
    <div className="log-in-container m-auto flex max-w-lg flex-col justify-around">
      <h2>Log-in to Get Started</h2>
      <div className="flex flex-row">
        <FacebookSigninBox />
        <GoogleSignInBox />
      </div>
      <p className="m-auto p-10">-- or --</p>

      <div>
        <EmailSignUp />
      </div>
    </div>
  );
};

export default SignIn;
