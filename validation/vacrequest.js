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

  if (!Number.isInteger(data.hours)) {
    errors.hours = 'Requested hours must be an integer between 0 and 160';
  }

  if (data.month < 0 || data.month > 11) {
    errors.month = 'Requested month is an invalid month';
  }

  if (data.hours < 1) {
    errors.hours = 'Requested hours must be 1 or greater';
  }

  if (data.hours > 160) {
    errors.hours = 'Requested hours cannot be over 160';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
