const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Register Regular User
router.post('/signup/user', async (req, res) => {
  const { username, password, instrument } = req.body;
  if (!username || !password || !instrument) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, instrument, role: 'player' });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Register Admin User
router.post('/signup/admin', async (req, res) => {
  const { username, password, instrument } = req.body;
  if (!username || !password || !instrument) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, instrument, role: 'admin' });
    await user.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ error: 'Error registering admin' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    res.json({ token, role: user.role, instrument: user.instrument });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
