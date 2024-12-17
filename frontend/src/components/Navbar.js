// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user); // Example selector

  return (
    <nav className="navbar bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <Link to="/" className="text-xl font-bold">
            MyApp
          </Link>
        </div>
        <div className="links">
          <Link to="/" className="mr-4 hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="mr-4 hover:text-gray-300">
            About
          </Link>
          {user && (
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
