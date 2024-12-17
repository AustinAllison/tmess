const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.get('/send-test-email', async (req, res) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER, // Mailtrap username
          pass: process.env.EMAIL_PASS, // Mailtrap password
        },
      });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'atallison2022@gmail.com', // Replace with your test recipient
      subject: 'Test Email from Nodemailer',
      text: 'This is a test email sent for Registering on TMess App!',
      html: `<h1>Test Email</h1><p>This is a test email sent from your backend using Nodemailer.</p>`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Test email sent successfully!', info });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ message: 'Failed to send test email', error });
  }
});

module.exports = router;
