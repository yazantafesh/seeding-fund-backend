'use strict';

const User = require('../models/userModel');

module.exports = async (req, res, next) => {
  //Here we make sure we have authorization headers
  if (!req.headers.authorization) {
    next('missing auth headers!');
    return;
  }
    // Here we make sure we have bearer in the auth headers
  const headers = req.headers.authorization.split(' ');
  if (headers[0] !== 'Bearer') {
    next('Invalid auth headers!');
    return;
  }
  //Here we authenticate the user's token
  try {
    const validUser = await User.authenticateToken(headers[1]);
    req.user = validUser;
    next();
  } catch (error) {
    next(error.message);
  }
};
