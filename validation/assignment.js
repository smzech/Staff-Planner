const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAssignmentInput(data) {
  let errors = {};

  if (isEmpty(data.eid)) {
    errors.eid = 'EID field required';
  }

  if (isEmpty(data.pid)) {
    errors.pid = 'PID field required';
  }

  if (isEmpty(data.name)) {
    errors.name = 'Name field required';
  }

  if (isEmpty(data.pmid)) {
    errors.pmid = 'Name field required';
  }

  data.tasks.forEach(task => {
    if (task.month < 0 || task.month > 11) {
      errors.month = 'A task month is invalid';
    }
    if (!Number.isInteger(task.hours)) {
      errors.hours = 'Requested hours must be an integer between 0 and 160';
    } else if (task.hours < 1) {
      errors.hours = 'Requested hours must be 1 or greater';
    } else if (task.hours > 160) {
      errors.hours = 'Requested hours cannot be over 160';
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

function initCheck(data) {}
