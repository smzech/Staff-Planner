const Validator = require('validator');
const isEmpty = require('./is-empty');

// REMOVE LOG LINES

module.exports = function validateVactionRequestInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.month)) {
    errors.month = 'Requested month required';
    console.log('1');
  }

  if (data.hours === null) {
    errors.hours = 'Requested hours cannot be null';
    console.log('2');
  }

  if (!Number.isInteger(data.hours)) {
    errors.hours = 'Requested hours must be an integer between 0 and 160';
    console.log('3');
  } else if (data.month < 0 || data.month > 11) {
    errors.month = 'Requested month is an invalid month';
    console.log('4');
  } else if (data.hours < 1) {
    errors.hours = 'Requested hours must be 1 or greater';
    console.log('5');
  } else if (data.hours > 160) {
    errors.hours = 'Requested hours cannot be over 160';
    console.log('6');
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
