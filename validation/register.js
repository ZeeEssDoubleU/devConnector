const validator = require('validator');
const isEmpty = require('./isEmpty.js');

const validateRegisterInput = data => {
   let errors = {};

   // make sure that data fields are strings for Validator
   data.name = !isEmpty(data.name) ? data.name : '';
   data.email = !isEmpty(data.email) ? data.email : '';
   data.password = !isEmpty(data.password) ? data.password : '';
   data.password2 = !isEmpty(data.password2) ? data.password2 : '';

   // name validation
   if (validator.isEmpty(data.name)) {
      // name empty
      errors.name = 'Name field is required.';
   }
   else if (!validator.isLength(data.name, { min: 2, max: 30 })) {
      // name length
      errors.name = 'Name must be between 2 and 30 characters.';
   }

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
   else if (!validator.isLength(data.password, { min: 6, max: 30 })) {
      // password length
      errors.password = 'Password must be between 6 and 30 characters.';
   }

   // confirm password validation
   if (validator.isEmpty(data.password2)) {
      // confirm password empty
      errors.password2 = 'Confirm Password field is required.';
   }
   else if (!validator.equals(data.password, data.password2)) {
      // passwords match
      errors.password2 = 'Passwords must match.';
   }

   return {
      errors,
      isValid: isEmpty(errors)
   }
};

module.exports = validateRegisterInput;
