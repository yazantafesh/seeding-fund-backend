'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../middlewares/basic-auth');
const User = require('../models/userModel');

//This is the signup

router.post('/up', async (req, res) => {
  try {
    const user = new User(req.body);
    const doc = await user.save();
    const token = User.generateToken(doc);
    res.status(201).json({ token });
  } catch (error) {
    res.status(403).json({ message: 'Error Creating User' });
  }
});

//This is the signin

router.post('/in', basicAuth, (req, res) => {
  res.json({ token: req.token });
});

module.exports = router;