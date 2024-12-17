// src/pages/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
