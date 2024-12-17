// src/pages/Register.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice'; // Ensure correct path
import { useNavigate, Navigate } from 'react-router-dom';
import { Input, Button, Form, FormField, FormLabel, FormMessage } from '../components/shadcn'; // Ensure all components are imported

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'poster', // default role
    licenseNumber: '',
  });

  const { name, email, password, role, licenseNumber } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
      // Optionally, handle the error (e.g., display a message)
    }
  };

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      {/* Display Redux Errors */}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <Form onSubmit={onSubmit}>
        {/* Name Field */}
        <FormField>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
            placeholder="Enter your name"
          />
          <FormMessage />
        </FormField>

        {/* Email Field */}
        <FormField>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="Enter your email"
          />
          <FormMessage />
        </FormField>

        {/* Password Field */}
        <FormField>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Enter your password"
          />
          <FormMessage />
        </FormField>

        {/* Role Field */}
        <FormField>
          <FormLabel htmlFor="role">Role</FormLabel>
          <select
            id="role"
            name="role"
            value={role}
            onChange={onChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="poster">Poster</option>
            <option value="claimer">Claimer</option>
          </select>
          <FormMessage />
        </FormField>

        {/* License Number Field */}
        <FormField>
          <FormLabel htmlFor="licenseNumber">License Number</FormLabel>
          <Input
            type="text"
            id="licenseNumber"
            name="licenseNumber"
            value={licenseNumber}
            onChange={onChange}
            required
            placeholder="Enter your license number"
          />
          <FormMessage />
        </FormField>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-6"
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
    </div>
  );
};

export default Register;
