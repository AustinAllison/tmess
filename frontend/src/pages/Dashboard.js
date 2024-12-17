// src/pages/Dashboard.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; // Action to handle logout
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to Home after logout
  };

  return (
    <div className="dashboard container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Please log in to access your dashboard.</p>
      )}
      {/* Add more dashboard content here */}
    </div>
  );
};

export default Dashboard;
