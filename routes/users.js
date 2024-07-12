const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/Users");

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    // If user not found or password doesn't match, return error
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

  

    // Return token to the client
    res.status(200).json({ message: 'Successfully login' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;