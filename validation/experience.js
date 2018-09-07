const validator = require('validator');
const isEmpty = require('./isEmpty.js');

const validateExperienceInput = data => {
   let errors = {};

   // make sure that data fields are strings for Validator
   data.title = !isEmpty(data.title) ? data.title : '';
   data.company = !isEmpty(data.company) ? data.company : '';
   data.from = !isEmpty(data.from) ? data.from : '';

   // job title validation
   if (validator.isEmpty(data.title)) {
      // job title empty
      errors.title = 'Job title field is required.';
   }

   // Company validation
   if (validator.isEmpty(data.company)) {
      // Company empty
      errors.company = 'Company field is required.';
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

module.exports = validateExperienceInput;
