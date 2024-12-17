const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { sequelize } = require('./models');


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));

// Test Route
app.get('/', (req, res) => {
  res.send('Real Estate Platform API');
});
const testEmailRoute = require('./routes/testEmail');
app.use('/api', testEmailRoute);
console.log('Test email route registered!');

app.get('/api/view-users', async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT * FROM "Users";');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});



