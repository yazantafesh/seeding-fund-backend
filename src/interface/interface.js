'use strict';
const userModel = require('../models/userModel');

class Interface {
  constructor(model) {
    this.model = model;
  }

  //This handles saving the newly created projects to the DB

  async createProject(obj) {
    try {
      console.log(obj)
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
        requiredFunding: obj.requiredFunding,
        urgency: obj.urgency
      });
      await user.save()
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        projects: user.projects
      };
    } catch (error) {
      return error;
    }
  };

  //This returns all the found projects for the specified user

  async readProjects(email) {
    if (email) {
      let user = await this.model.findOne({ email: email });
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        projects: user.projects
      };
    }
  }

  //This handles deleting a specific project

  async deleteProject(obj) {
    let user = await this.model.findOne({ email: obj.email })

      const newProjectArr = user.projects.filter((project) => {
        if (project.name !== obj.name) {
          return project;
        }
      })
      user.projects = newProjectArr;
      await user.save();
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        projects: user.projects
      };

  }

  // update(docName) {
  //   if (docName) {
  //     return this.model.find({ docName: docName });
  //   }
  // }

}

module.exports = new Interface(userModel);