const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models'); // Import database connection

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/appointments', require('./routes/appointments')); // Appointment routes

// Test Route
app.get('/', (req, res) => {
  res.send('Real Estate Platform API');
});

module.exports = app; // Export the app instance
