const Validator = require('validator');
const isEmpty = require('./is-empty');

// REMOVE LOG LINES

module.exports = function validateVactionRequestInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.month)) {
    errors.month = 'Requested month required';
  }

  if (data.hours === null) {
    errors.hours = 'Requested hours cannot be null';
  }

  if (data.month < 0 || data.month > 11) {
    errors.month = 'Requested month is an invalid month';
  }

  if (!Number.isInteger(data.hours)) {
    errors.hours = 'Requested hours must be an integer between 0 and 160';
  } else if (data.hours < 1) {
    errors.hours = 'Requested hours must be 1 or greater';
  } else if (data.hours > 160) {
    errors.hours = 'Requested hours cannot be over 160';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
