'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearer-auth');
const acl = require('../middlewares/acl-middleware');
const userModel = require('../models/userModel');
const Interface = require('../interface/interface');

//Here we have the requests

router.get('/read', bearerAuth, async (req, res) => {
  const { email } = req.query;
  const userData = await Interface.readProjects(email)
  res.json( userData );
});

router.post('/create', bearerAuth, acl('create'), async (req, res) => {
  const { name, description, sector, requiredFunding, urgency, email } = req.body;

  try {
    const updatedUserData = await Interface.createProject({ name, description, sector, requiredFunding, urgency, email });
    res.json( updatedUserData );
  } catch (error) {
    res.json({error: error.message});
  }
});

router.delete('/delete', bearerAuth, acl('delete'), async (req, res) => {
  const { name, email } = req.body;
  const afterDeletion = await Interface.deleteProject({ name, email });
  res.send(afterDeletion);
});

// router.put('/update', bearerAuth, acl('update'), (req, res) => {
//   res.send('I can Update');
// });

module.exports = router;