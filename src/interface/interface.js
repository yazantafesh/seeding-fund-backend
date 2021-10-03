'use strict';
const userModel = require('../models/userModel');

class Interface {
  constructor(model) {
    this.model = model;
  }

  //This handles saving the newly created projects to the DB

  async createProject(obj) {
    try {
      let user = await this.model.findOne({ email: obj.email });

      //This step insures no repeated project names

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
      return error.message;
    }
  };

  //This returns all the found projects for the specified user depending on the role

  async readProjects(email) {
    if (email) {

      //for Project Owners

      let user = await this.model.findOne({ email: email });

      if (user.role === 'projectOwner') {
        return {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          projects: user.projects
        };

        //for Admins

      } else if (user.role === 'admin') {
        let allUsersData = await this.model.find({});
        let allProjects = [];

        allUsersData.forEach((user) => {

          let userProjects = [];

          user.projects.forEach((project) => {
            userProjects.push({
              name: project.name,
              description: project.description,
              sector: project.sector,
              requiredFunding: project.requiredFunding,
              urgency: project.urgency,
              status: project.status,
              email: user.email
            });
          });
          allProjects = [...allProjects, ...userProjects]
        });

        let projectStatusData = {
          Accepted: 0,
          Declined: 0,
          Pending: 0
        };

        allProjects.forEach((project) => {
          if (project.status === 'Accepted') {
            projectStatusData.Accepted += 1;
          } else if (project.status === 'Declined') {
            projectStatusData.Declined += 1;
          } else if (project.status === 'Pending') {
            projectStatusData.Pending += 1;
          };
        });
        return {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          projects: allProjects,
          projectStatus: projectStatusData
        };
      }
    }
  }

  //This handles deleting a specific project

  async deleteProject(obj) {
    let user = await this.model.findOne({ email: obj.email })

    const newProjectArr = user.projects.filter((project) => {
      if (project.name !== obj.name) {
        return project;
      }
    });

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

  //This handles updating the status of the project

  async updateProject(obj) {
    let user = await this.model.findOne({ email: obj.email })

    const newProjectArr = user.projects.map((project) => {
      if (project.name === obj.name) {
        project.status = obj.status;
      }
      return project;
    })
    user.projects = newProjectArr;
    await user.save();
  };
}

module.exports = new Interface(userModel);