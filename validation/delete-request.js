const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateDeleteRequest(data) {
  let errors = {};

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
