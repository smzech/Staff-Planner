const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RequestSchema = new Schema({
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
    required: true
  },
  reqtype: {
    type: String,
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
        require: true,
        default: 0
      }
    }
  ]
});

module.exports = Request = mongoose.model('requests', RequestSchema);
