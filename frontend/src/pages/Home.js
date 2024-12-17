import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="home container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Welcome to Real Estate Platform</h1>
      <p className="text-lg mb-6 text-gray-700">
        A seamless platform for managing property appointments. 
        Whether you're a <span className="font-semibold">Poster</span> listing properties or a 
        <span className="font-semibold">Claimer</span> booking appointments, we’ve got you covered!
      </p>

      {user ? (
        <div>
          <p className="text-green-600 text-xl mb-4">
            Welcome back, <b>{user.name}</b>! 
          </p>
          <Link
            to="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Your Dashboard
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Key Features:</h2>
        <ul className="text-left inline-block">
          <li>✅ Post appointments for properties</li>
          <li>✅ Claim appointments based on availability</li>
          <li>✅ Secure and easy-to-use dashboard</li>
          <li>✅ Notifications and role-specific access</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
