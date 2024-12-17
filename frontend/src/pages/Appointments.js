import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, claimAppointment } from '../redux/slices/appointmentSlice';

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(state => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);x

  const handleClaim = (id) => {
    dispatch(claimAppointment(id));
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
x
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Available Appointments</h2>
      {appointments.length === 0 ? (
        <p>No available appointments.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map(app => (
            <div key={app.id} className="p-4 border rounded">
              <h3 className="text-xl font-semibold">{app.propertyAddress}</h3>
              <p>Date: {new Date(app.date).toLocaleDateString()}</p>
              <p>Time: {app.time}</p>
              <p>Compensation: ${app.compensation}</p>
              <p>Posted by: {app.poster.name}</p>
              <button
                onClick={() => handleClaim(app.id)}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Claim Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
