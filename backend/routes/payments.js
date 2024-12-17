const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const { Appointment } = require('../models');
const authMiddleware = require('../middleware/auth');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a Payment Intent
router.post('/create-payment-intent', authMiddleware, async (req, res) => {
  const { appointmentId } = req.body;
  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });
    if (appointment.status !== 'completed') return res.status(400).json({ msg: 'Appointment not completed' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(appointment.compensation * 100), // amount in cents
      currency: 'usd',
      metadata: { appointmentId: appointment.id },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
