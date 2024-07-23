import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { GoogleLoginButton } from 'react-social-login-buttons';

import { signInWithGoogle } from '../../services/authService';
import { Button } from '../ui/button';

function GoogleSignInBox() {
  const navigate = useNavigate();

  const handleGoogleButton = async () => {
    try {
      await signInWithGoogle(navigate);
    } catch (error: any) {
      console.error('Error signing in with Google: ', error);
      throw error;
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleGoogleButton}>
      Login with Google
    </Button>
    // <GoogleLoginButton onClick={handleGoogleButton} />
  );
}

export default GoogleSignInBox;
