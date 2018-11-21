const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FunctionalManagerSchema = new Schema({
  fmid: {
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
  email: {
    type: String,
    required: true
  }
});

module.exports = FunctionalManager = mongoose.model(
  'functionalManagers',
  FunctionalManagerSchema
);
