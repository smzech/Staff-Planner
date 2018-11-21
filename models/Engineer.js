const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EngineerSchema = new Schema({
  eid: {
    type: Number,
    required: true
  },
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  dept: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fmid: {
    type: Number,
    required: true,
    ref: 'functionalManagers' // ???
  }
});

module.exports = Engineer = mongoose.model('engineers', EngineerSchema);
