'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearer-auth');
const acl = require('../middlewares/acl-middleware');
const Interface = require('../interface/interface');

//Here we have the requests

//Reading data
router.get('/read', bearerAuth, acl('read'), async (req, res) => {
  const { email } = req.query;
  const userData = await Interface.readProjects(email)
  res.json(userData);
});

//Creating a new request
router.post('/create', bearerAuth, acl('create'), async (req, res) => {
  const { name, description, sector, requiredFunding, urgency, email } = req.body;

  try {
    const updatedUserData = await Interface.createProject({ name, description, sector, requiredFunding, urgency, email });
    res.json(updatedUserData);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//Deleting a request
router.delete('/delete', bearerAuth, acl('delete'), async (req, res) => {
  const { name, email } = req.body;
  const afterDeletion = await Interface.deleteProject({ name, email });
  res.send(afterDeletion);
});

//Updating the status of a request
router.put('/update', bearerAuth, acl('update'), async (req, res) => {
  const { name, email, status } = req.body;
  await Interface.updateProject({ name, email, status });
  res.send('updated');
});

module.exports = router;