const express = require('express');
const router = express.Router();
const userModel = require('../model/user');

router.get('/users', (req, res) => {
  userModel.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch users' });
    }
    res.status(200).json(users);
  });
});

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  userModel.getUserById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch user' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  });
});

module.exports = router;
