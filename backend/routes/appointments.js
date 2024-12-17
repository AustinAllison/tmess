const express = require('express');
const router = express.Router();
const { Appointment, User } = require('../models');
const authMiddleware = require('../middleware/auth');

// Create Appointment (Poster)
router.post('/', authMiddleware, async (req, res) => {
  const { propertyAddress, date, time, compensation, notes } = req.body;
  try {
    const appointment = await Appointment.create({
      propertyAddress,
      date,
      time,
      compensation,
      notes,
      posterId: req.user.userId,
    });
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get All Available Appointments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { status: 'available' },
      include: [{ model: User, as: 'poster', attributes: ['id', 'name', 'email'] }],
    });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Claim Appointment (Claimer)
router.put('/:id/claim', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });
    if (appointment.status !== 'available') return res.status(400).json({ msg: 'Appointment not available' });

    appointment.status = 'claimed';
    appointment.claimerId = req.user.userId;
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Complete Appointment
router.put('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });
    if (appointment.status !== 'claimed') return res.status(400).json({ msg: 'Appointment not in claimed status' });
    if (appointment.claimerId !== req.user.userId) return res.status(403).json({ msg: 'Not authorized' });

    appointment.status = 'completed';
    await appointment.save();

    // Optionally, update ratings here

    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get User's Appointments
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: {
        [Op.or]: [{ posterId: req.user.userId }, { claimerId: req.user.userId }],
      },
      include: [
        { model: User, as: 'poster', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'claimer', attributes: ['id', 'name', 'email'] },
      ],
    });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
