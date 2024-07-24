import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { NavigateFunction } from 'react-router-dom';

import {
  auth,
  signInWithPopup,
  facebookProvider,
  googleProvider,
  db,
} from '../firebaseConfig';

// Email Sign in

export const signUpEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logInEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const sendPasswordResetEmail = async (email: string) => {
  try {
    await firebaseSendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Facebook Sign In

export const signInWithFacebook = async (navigate: NavigateFunction) => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const { user } = result;
    createFirestoreProfile(user, navigate);

    // Handle user profile creation or redirection here
  } catch (error) {
    console.error('Error signing in with Facebook: ', error);
    throw error;
  }
};

// Google Sign In

export const signInWithGoogle = async (navigate: NavigateFunction) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { user } = result;

    createFirestoreProfile(user, navigate);
  } catch (error) {
    console.error('Error signing in with Google: ', error);
  }
};

async function createFirestoreProfile(user: User, navigate: NavigateFunction) {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Profile exists, navigate to home page
      navigate('/');
    } else {
      // Profile does not exist, create profile and navigate to edit profile page
      await setDoc(userDocRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        birthdate: '',
      });
      navigate('/profile');
    }
  } catch (error) {
    console.error('Error creating Firestore profile: ', error);
    throw error;
  }
}
