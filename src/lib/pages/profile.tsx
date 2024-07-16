// src/Pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { User, updateProfile, updateEmail, deleteUser } from 'firebase/auth';
import { Button } from '../../components/Button';
import { ListItem } from '../../components/SoreComponents/SoreDetails';
import { useUIContext } from '../Context/UiContext';

const Profile: React.FC = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState('');
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setCankerSores, setSelectedSore } = useUIContext();
  const userId = auth.currentUser?.uid ?? "";

  useEffect(() => {
    const state = location.state as { editProfile: boolean, email: string, name: string } | undefined;
    if (state?.editProfile) {
      setEditProfile(true);
      setEmail(state.email || '');
      setName(state.name || '');
    }

    // Retrieve user profile from local storage
    const cachedProfile = localStorage.getItem(`userProfile_${userId}`);
    if (cachedProfile) {
      const userData = JSON.parse(cachedProfile);
      setName(userData.displayName || '');
      setEmail(userData.email || '');
      setPhotoURL(userData.photoURL || '');
      setBirthdate(userData.birthdate || '');
    }

    const fetchUserProfile = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.displayName || '');
          setEmail(userData.email || '');
          setPhotoURL(userData.photoURL || '');
          setBirthdate(userData.birthdate || '');
          // Cache the profile data in local storage
          localStorage.setItem(`userProfile_${userId}`, JSON.stringify(userData));
        } else {
          // User profile not found, create a new one
          const newUserProfile = {
            displayName: state?.name || '',
            email: currentUser.email || '',
            photoURL: '',
            birthdate: ''
          };
          await setDoc(userDocRef, newUserProfile);
          setEmail(currentUser.email || '');
          setName(state?.name || '');
        }
      }
    };
    fetchUserProfile();
  }, [userId, location.state]);

  const handleSaveProfile = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUpdated(true);
      try {
        await updateProfile(currentUser, {
          displayName: name,
          photoURL: photoURL,
        });

        await updateEmail(currentUser, email);

        const userDocRef = doc(db, 'users', currentUser.uid);
        const updatedUserData = {
          displayName: name,
          email: email,
          photoURL: photoURL,
          birthdate: birthdate,
        };
        await setDoc(userDocRef, updatedUserData);

        // Update the local storage with the latest profile data
        localStorage.setItem(`userProfile_${userId}`, JSON.stringify(updatedUserData));
        setUpdated(false);
        setEditProfile(false);
        console.log('Profile updated successfully');
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setBirthdate('');
      setSelectedSore(null);
      setCankerSores([]);
      setEmail('');
      setName('');
      setPhotoURL('');
      setUpdated(false);
      navigate('/sign-in'); 
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        // Delete user document from Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        await deleteDoc(userDocRef);

        // Delete user from Firebase Authentication
        await deleteUser(currentUser);

        // Clear local storage and navigate to sign-in page
        localStorage.removeItem(`userProfile_${userId}`);
        localStorage.removeItem(`cankerSores_${userId}`);
        navigate('/sign-in');
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="max-w-lg m-auto">
      {!editProfile && (
        <div className="profile-info">
          <h2>My Profile</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            {photoURL && <img src={photoURL} className="rounded-full my-5" alt="Profile" />}
            <ul className="border-solid border-2 border-black rounded my-5 max-w-lg">
              <ListItem label={"Name:"} data={name} />
              <ListItem label="ID:" data={userId} />
              <ListItem label="Birthdate:" data={birthdate} />
              <ListItem label="Email:" data={email} />
            </ul>
          </div>
          <div>
            <Button label="Edit Profile" action={() => setEditProfile(true)} />
            <Button label="Sign Out" action={handleSignOut} />
          </div>
          <div className='flex justify-end'>
            <button className=' text-red-700 hover:text-red-500 m-2 ' onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        </div>
      )}

      {editProfile && (
        <div>
          <h2>Edit Profile</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
            <div className='profile-photo flex flex-row'>
              <div>
                <label>Profile Photo URL:</label>
                <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
              </div>
              {photoURL && <img src={photoURL} className="rounded-full m-5" alt="Profile" />}
            </div>
            <div>
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label>Birthdate:</label>
              <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
            <Button label="Back" action={() => setEditProfile(false)} />
          </form>
          {updated && <p className='my-5 col'>Updated!</p>}
        </div>
      )}
    </div>
  );
};

export default Profile;
