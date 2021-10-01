'use strict';

const mongoose = require('mongoose');

//Defining the project schema

const projectSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  sector: { type: String, required: true },
  status: { type: String, required: true, default: 'Pending' },
})

//Defining the project model

const projectModel = mongoose.model('project', projectSchema)

module.exports = { projectModel, projectSchema };