'use strict';

const base64 = require('base-64');
const User = require('../models/userModel');


module.exports = async (req, res, next) => {
  
  //Here we make sure we have authorization headers
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }
  // Here we make sure we have basic in the auth headers
  let authHeaders = req.headers.authorization.split(' ');
  if (authHeaders[0] !== 'Basic') {
    next('Invalid Login');
    return;
  }

  // Here we decode the headers then do basic auth and if successful we generate a token for the user
  const [email, pass] = base64.decode(authHeaders[1]).split(':');
  try {
    const validUser = await User.authenticateBasic(email, pass);
    req.token = User.generateToken(validUser);
    next();
  } catch (error) {
    next('Invalid Login');
  }
};
