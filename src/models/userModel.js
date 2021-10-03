'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET;
const projectSchema = require('./projectModel').projectSchema

//Defining the user schema with the available options

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: 'projectOwner',
    enum: ['projectOwner', 'admin'],
  },
  projects: [projectSchema]
},
  {
    toJSON: { virtuals: true },
  }
);

//Defining the capabilities for different user roles

userSchema.virtual('capabilities').get(function () {
  const acl = {
    projectOwner: ['read', 'create', 'delete'],
    admin: ['read', 'update'],
  };
  return acl[this.role];
});

//Basic authentication

userSchema.statics.authenticateBasic = async function (email, password) {
  const user = await this.findOne({ email });
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error('Invalid Login');
  };
  return user;
};

//Token generation

userSchema.statics.generateToken = function (user) {
  let userData = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    capabilities: user.capabilities
  };
  return jwt.sign(userData, SECRET);
};

//Token authentication

userSchema.statics.authenticateToken = async function (token) {
  try {
    const payload = jwt.verify(token, SECRET);
    const user = await this.findOne({ email: payload.email });
    if (user) {
      return user;
    }
    throw new Error('USER NOT FOUND');
  } catch (error) {
    throw new Error(error.message);
  }
};

//Defining the user model

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;