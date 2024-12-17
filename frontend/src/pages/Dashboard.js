import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For fetching appointments

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [appointments, setAppointments] = useState([]); // Store appointments
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch appointments based on user role
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const endpoint =
          user.role === 'poster'
            ? 'http://localhost:3002/api/appointments/mine' // API for posters
            : 'http://localhost:3002/api/appointments/available'; // API for claimers

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token for auth
          },
        });
        setAppointments(response.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchAppointments();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token'); // Clear the token
    navigate('/'); // Redirect to Home after logout
  };

  return (
    <div className="dashboard container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {user ? (
        <div>
          {/* User Info */}
          <p className="text-xl">Welcome, <b>{user.name.trim()}</b>!</p>
          <p className="text-gray-700">Role: {user.role.trim() === 'poster' ? 'Poster' : 'Claimer'}</p>

          {/* Appointments Section */}
          <h2 className="text-2xl font-semibold mt-6">
            {user.role === 'poster' ? 'Your Posted Appointments' : 'Available Appointments'}
          </h2>

          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <ul className="mt-4">
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="border rounded p-2 mb-2 shadow"
                >
                  <p><b>Title:</b> {appointment.title}</p>
                  <p><b>Date:</b> {appointment.date}</p>
                  <p><b>Location:</b> {appointment.location}</p>
                  {user.role === 'claimer' && (
                    <button
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={() => console.log(`Claiming appointment ${appointment.id}`)}
                    >
                      Claim Appointment
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">
              {user.role === 'poster'
                ? 'You have no posted appointments.'
                : 'No available appointments to claim.'}
            </p>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-red-500">Please log in to access your dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
