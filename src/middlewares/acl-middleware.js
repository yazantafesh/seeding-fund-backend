'use strict';

//Here we have the acl middleware to make sure the user has the right capability before we continue with the function

module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        next('Access Denied');
      }
    } catch (error) {
      next(error.message);
    }
  };
};
