const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateVactionRequestInput(data) {
  let errors = {};

  console.log(data.month);
  console.log(data.hours);
  console.log(Validator.isEmpty(data.month));
  console.log(Validator.isEmpty(data.hours));

  if (Validator.isEmpty(data.month)) {
    errors.month = 'Requested month required';
    console.log('i should not be here');
  }

  if (Validator.isEmpty(data.hours)) {
    errors.hours = 'Requested hours required';
  }

  if (data.month < 0 || data.month > 12) {
    errors.month = 'Requested month is an invalid month';
  }

  if (data.hours < 0) {
    errors.hours = 'Requested hours cannot be negative';
  }

  if (data.hours > 160) {
    errors.hours = 'Requested hours cannot be over 160';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
