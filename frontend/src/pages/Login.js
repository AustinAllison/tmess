// src/pages/Login.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice'; // Correct import
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      console.log('Login successful!');
      navigate('/dashboard'); // Redirect upon success
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  
  // Debug Redux state
  console.log('Auth Status:', authStatus);
  console.log('Auth Error:', authError);
  console.log('User:', user);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="login container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {authError && <p className="text-red-500 mb-4">{authError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          disabled={authStatus === 'loading'}
        >
          {authStatus === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
