const validator = require('validator');
const isEmpty = require('./isEmpty.js');

const validateEducationInput = data => {
   let errors = {};

   // make sure that data fields are strings for Validator
   data.school = !isEmpty(data.school) ? data.school : '';
   data.degree = !isEmpty(data.degree) ? data.degree : '';
   data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
   data.from = !isEmpty(data.from) ? data.from : '';

   // school validation
   if (validator.isEmpty(data.school)) {
      // school empty
      errors.school = 'School field is required.';
   }

   // degree validation
   if (validator.isEmpty(data.degree)) {
      // degree empty
      errors.degree = 'Degree field is required.';
   }

   // fieldOfStudy validation
   if (validator.isEmpty(data.fieldOfStudy)) {
      // fieldOfStudy empty
      errors.fieldOfStudy = 'Field of Study field is required.';
   }

   // from date validation
   if (validator.isEmpty(data.from)) {
      // from date empty
      errors.from = 'From date field is required.';
   }


   return {
      errors,
      isValid: isEmpty(errors)
   }
};

module.exports = validateEducationInput;
