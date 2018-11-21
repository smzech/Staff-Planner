const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AssignmentSchema = new Schema({
  eid: {
    type: Number,
    required: true
  },
  pid: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    require: true
  },
  pmid: {
    type: Number,
    required: true
  },
  tasks: [
    {
      month: {
        type: Number,
        required: true
      },
      hours: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = Assignment = mongoose.model('assignments', AssignmentSchema);
