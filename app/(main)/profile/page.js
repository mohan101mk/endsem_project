import React from 'react';
import RequireAuth from '../../components/RequireAuth';

export default function ProfilePage() {
  return (
    <RequireAuth>
      <div>
        <h1>Profile Page</h1>
        <p>This is the  profile.</p>
      </div>
    </RequireAuth>
  );
}