import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'poster', // default role
    licenseNumber: '',
  });

  const { name, email, password, role, licenseNumber } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    dispatch(registerUser(formData)).unwrap()
      .then(() => navigate('/dashboard'))
      .catch(() => {});
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required className="w-full p-2 border" />
        </div>
        <div className="mb-4">
          <label className="block">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required className="w-full p-2 border" />
        </div>
        <div className="mb-4">
          <label className="block">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required className="w-full p-2 border" />
        </div>
        <div className="mb-4">
          <label className="block">Role</label>
          <select name="role" value={role} onChange={onChange} required className="w-full p-2 border">
            <option value="poster">Poster</option>
            <option value="claimer">Claimer</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block">License Number</label>
          <input type="text" name="licenseNumber" value={licenseNumber} onChange={onChange} required className="w-full p-2 border" />
        </div>
        <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white">
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
