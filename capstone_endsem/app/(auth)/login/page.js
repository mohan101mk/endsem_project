'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import  './login.css'; // Import the CSS module

export default function LoginPage() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { fullName, email, password } = userData;
    if (fullName && email && password) {
      localStorage.setItem('fullname', fullName);
      localStorage.setItem('email', email);
      router.push('/dashboard');
    }
  };

  return (
    <div className='login-container'>
      <h2 className='login-title' >Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={userData.fullName}
          onChange={handleChange}
          className='input-box'
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          className='input-box'
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          className='input-box'
          required
        />
        <button type="submit" className='login-button'>
          Login
        </button>
      </form>
    </div>
  );
}
