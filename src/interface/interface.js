'use strict';
const userModel = require('../models/userModel');

class Interface {
  constructor(model) {
    this.model = model;
  }

  async createProject(obj) {
    try {
      let user = await this.model.findOne({ email: obj.email });

      for (let i = 0; i < user.projects.length; i++) {
        if (user.projects[i].name === obj.name) {
          throw new Error('Project Name Must Be Unique!')
        }
      }
      user.projects.push({
        name: obj.name,
        description: obj.description,
        sector: obj.sector,
        status: obj.status
      });
      await user.save()
      return user;
    } catch (error) {
      return error;
    }
  };

  async readProjects(email) {
    if (email) {
      let user = await this.model.findOne({ email: email });
      return user.projects;
    }
  }

  deleteProject(obj) {
    this.model.find({ email: obj.email }, (error, userData) => {
      const newProjectArr = userData[0].projects.filter((project) => {
        if (project.name !== obj.name) {
          return project;
        }
      })
      userData[0].projects = newProjectArr;
      userData[0].save();
      return userData[0].projects;
    })
  }

  // update(docName) {
  //   if (docName) {
  //     return this.model.find({ docName: docName });
  //   }
  // }

}

module.exports = new Interface(userModel);