'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearer-auth');
const acl = require('../middlewares/acl-middleware');

//Here we have the requests

router.get('/read', bearerAuth, (req, res) => {
  res.send('I can READ');
});

router.post('/create', bearerAuth, acl('create'), (req, res) => {
  res.send('I can POST');
});

router.put('/update', bearerAuth, acl('update'), (req, res) => {
  res.send('I can Update');
});

module.exports = router;