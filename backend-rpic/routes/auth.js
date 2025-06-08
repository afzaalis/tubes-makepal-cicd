const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addUser, getUserByEmail, getUserById, updateUserById } = require('../model/user');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware untuk otentikasi
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user; // Informasi pengguna dari token
    next();
  });
};

// Signup endpoint
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  const role = 'customer';

  getUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (user) return res.status(400).json({ message: 'Email already taken' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: err.message });

      addUser({ name, email, password: hashedPassword, role }, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created successfully' });
      });
    });
  });
});

// Login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

      // Generate JWT Token
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        JWT_SECRET,  // Secret Key untuk JWT
        { expiresIn: '1h' }  // Token kedaluwarsa dalam 1 jam
      );

      // Return the token and user data
      res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    });
  });
});

//update profile endpoint
router.put('/updateProfile', authenticateToken, (req, res) => {
  const { name, email, phone } = req.body;
  const userId = req.user.id;

  console.log("Request received for user:", userId, "with data:", { name, email, phone }); // Log request

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  getUserById(userId, (err, user) => {
    if (err) {
      console.error("Database error:", err); // Log database error
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }

    if (!user) {
      console.log("User not found:", userId); 
      return res.status(404).json({ message: 'User not found' });
    }

    updateUserById(userId, { name, email, phone }, (err, updatedUser) => {
      
      if (err) {
        console.error("Update error:", err); // Log update error
        return res.status(500).json({ error: 'Failed to update profile: ' + err.message });
      }
      console.log("Profile updated:", updatedUser); // Log success
      res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    });
  });
});

module.exports = router;
