const validator = require('validator');
const isEmpty = require('./isEmpty.js');

const validateLoginInput = data => {
   let errors = {};

   // make sure that data fields are strings for Validator
   data.email = !isEmpty(data.email) ? data.email : '';
   data.password = !isEmpty(data.password) ? data.password : '';

   // email validation
   if (validator.isEmpty(data.email)) {
      // email empty
      errors.email = 'Email field is required.';
   }
   else if (!validator.isEmail(data.email)) {
      // email invalid
      errors.email = 'Email is invalid.';
   }

   // password validation
   if (validator.isEmpty(data.password)) {
      // password empty
      errors.password = 'Password field is required.';
   }

   return {
      errors,
      isValid: isEmpty(errors)
   }
};

module.exports = validateLoginInput;
