// app/(main)/profile/page.js
'use client';

import React, { useEffect, useState } from 'react';
import RequireAuth from '../../components/RequireAuth';
import { useFinance } from '../layout';
import { auth } from '../../(auth)/login/firebase'; // Corrected path to your Firebase config
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // For redirect after logout
import styles from './profile.module.css'; // For styling

export default function ProfilePage() {
  const { transactions, totalBudget } = useFinance();
  const [user, setUser] = useState(null);
  const [tips, setTips] = useState([]);
  const [trends, setTrends] = useState([]);
  const [goal, setGoal] = useState({ target: 0, current: 0 });
  const [newName, setNewName] = useState(''); // For updating name
  const [newPhotoURL, setNewPhotoURL] = useState(''); // For updating photo URL
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setNewName(currentUser?.displayName || '');
      setNewPhotoURL(currentUser?.photoURL || '');
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      generateTipsAndTrends();
    }
  }, [transactions, totalBudget]);

  const generateTipsAndTrends = () => {
    // Existing function code (omitted for brevity; keep as is)
  };

  const progress = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: newName,
        photoURL: newPhotoURL,
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile.');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <RequireAuth>
      <div className={styles.container}>
        <h1 className={styles.title}>Your Profile</h1>
        
        {/* User Info with Name and Profile Picture */}
        <div className={styles.section}>
          <h2>User Information</h2>
          <div className={styles.profilePicContainer}>
            <img 
              src={user.photoURL || '/default-profile.png'}
              alt="Profile Picture" 
              className={styles.profilePic} 
              width={100} 
              height={100} 
            />
          </div>
          <p><strong>Name:</strong> {user.displayName || 'Not set'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {new Date(user.metadata.creationTime).toLocaleDateString()}</p>

          
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }} className={styles.updateForm}>
            <input 
              type="text" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              placeholder="Update Name" 
              className={styles.input} 
            />
           
            <button type="submit" className={styles.updateButton}>Update Profile</button>
          </form>
        </div>

       
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
    </RequireAuth>
  );
}
