import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../services/authService";
import { GoogleLoginButton } from "react-social-login-buttons";


export function GoogleSignInBox() {
    const navigate = useNavigate()

    const handleGoogleButton = async () => {
        try {
            await signInWithGoogle(navigate);

        } catch (error: any) {
        console.error('Error signing in with Google: ', error);
        throw error;    }
    }

    return (
            <GoogleLoginButton onClick={handleGoogleButton} />
    )
}