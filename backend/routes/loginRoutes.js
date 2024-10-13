import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/User.js';  // Ensure the User model is using ES6 module format
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user by username
    const user = await userModel.findOne({ username });
    if (!user) {
      // Return a generic error to avoid exposing whether the username or password was wrong
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET, // Use environment variable for the secret key
      { expiresIn: '1h' } // Token expiry time
    );

    // Send success response with the token and some user data
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    // Catch server errors
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
