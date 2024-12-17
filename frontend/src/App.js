// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navigation bar component
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Displayed on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* Login Route */}
        <Route path="/register" element={<Register />} /> {/* Registration Route */}
        <Route path="/notfound" element={<NotFound />} /> {/* Login Route */}

        <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
        />
        <Route path="/about" element={<About />} />
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
