const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateInitRequest(data) {
  let errors = {};

  if (isEmpty(data.pid)) {
    errors.pid = 'pid required';
  }

  if (isEmpty(data.eid)) {
    errors.eid = 'Eid required';
  }

  if (isEmpty(data.returnid)) {
    errors.returnid = 'returnid required';
  }

  if (isEmpty(data.name)) {
    errors.name = 'name required';
  }

  if (isEmpty(data.reqtype)) {
    errors.reqtype = 'reqtype required';
  }

  let sumZeroes = 0;
  data.tasks.forEach(task => {
    if (task.hours === null) {
      errors.hours = 'Requested hours cannot be null';
    }

    if (!Number.isInteger(task.hours)) {
      errors.hours = 'Requested hours must be an integer between 0 and 160';
    } else if (task.hours < 0) {
      errors.hours = 'Requested hours cannot be negative';
    } else if (task.hours > 160) {
      errors.hours = 'Requested hours cannot be over 160';
    }

    if (task.hours == 0) {
      sumZeroes += 1;
    }
  });

  if (sumZeroes === 6) {
    errors.hours = 'Cannot have all hours be zero';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
