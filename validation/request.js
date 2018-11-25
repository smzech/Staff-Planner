const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRequestInput(data) {
  let errors = {};

  switch (data.reqtype) {
    case 'init': {
    }
    case 'delta': {
    }
    case 'delete': {
    }
    default: {
      errors.reqtype = 'Unrecognized request type';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

function initCheck(data) {}

function deltaCheck(data) {}

function deleteCheck(data) {}
