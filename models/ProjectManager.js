const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProjectManagerSchema = new Schema({
  pmid: {
    type: Number,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  first: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  projects: [
    {
      pid: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = ProjectManager = mongoose.model(
  'projectManagers',
  ProjectManagerSchema
);
