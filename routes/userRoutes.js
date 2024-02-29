const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklist = new Set();
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  blacklist.add(token);
  res.status(200).json({ message: 'Logged out' });
});

// Get user profile
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (blacklist.has(token)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(decoded.userId);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { username, email, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      {
        username,
        email,
        password
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Register an admin user
router.post('/register-admin', authMiddleware, isAdmin, async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    if (!isAdmin) {
      return res.status(400).json({ message: 'Only admin users can be registered through this route' });
    }

    const newUser = new User({
      username,
      email,
      password,
      isAdmin,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

