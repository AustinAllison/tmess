const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const authMiddleware = require('../middleware/auth');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email app password or SMTP password
  },
});

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, role, licenseNumber } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create user
    user = await User.create({ name, email, password, role, licenseNumber });

    // Generate JWT token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send thank-you email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to the Real Estate Platform',
      html: `
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for registering as a <b>${role === 'poster' ? 'Poster' : 'Claimer'}</b>.</p>
        <p>You can now:</p>
        <ul>
          ${
            role === 'poster'
              ? '<li>Post appointments for others to claim <a href="http://localhost:3000/dashboard">Post Appointments</a></li>'
              : '<li>View available appointments to claim <a href="http://localhost:3000/dashboard">Claim Appointments</a></li>'
          }
        </ul>
        <p>We hope you enjoy using our platform!</p>
        <p>Best regards,</p>
        <p><b>The Real Estate Platform Team</b></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get Current User
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'name', 'email', 'role', 'rating'],
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
