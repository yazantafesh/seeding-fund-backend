'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../middlewares/basic-auth');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//This is the signup

router.post('/up', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, projects } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { email, password: hashedPassword, firstName, lastName, role, projects }
    const user = new User(userData);
    const doc = await user.save();
    const token = User.generateToken(doc);
    res.status(201).json({ token });
  } catch (error) {
    res.status(403).json({ message: 'Error Creating User' });
  }
});

//This is the signin

router.post('/in', basicAuth, (req, res) => {
  try {
    res.json({ token: req.token });

  } catch (error) {
    console.log(error.message)
  }
});

module.exports = router;