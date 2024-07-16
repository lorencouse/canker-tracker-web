import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithFacebook } from "../../services/authService";
import { FacebookLoginButton } from "react-social-login-buttons";

export function FacebookSigninBox() {
    const navigate = useNavigate()

    const handleFacebookButton = async () => {
        try {
            await signInWithFacebook(navigate);

        } catch (error: any) {
        console.error('Error signing in with Google: ', error);
        throw error;    }
    }

    return (
            <FacebookLoginButton onClick={handleFacebookButton} />
    )
}