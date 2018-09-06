const validator = require('validator');
const isEmpty = require('./isEmpty.js');

const validateProfileInput = data => {
   let errors = {};

   // make sure that data fields are strings for Validator
   data.handle = !isEmpty(data.handle) ? data.handle : '';
   data.status = !isEmpty(data.status) ? data.status : '';
   data.skills = !isEmpty(data.skills) ? data.skills : '';

   // profile handle validation
   if (validator.isEmpty(data.handle)) {
      // profile handle empty
      errors.handle = 'Profile handle is required.';
   }
   else if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
      // profile handle length
      errors.handle = 'Handle must be between 2 and 40 characters.';
   }

   // profile status validation
   if (validator.isEmpty(data.status)) {
      // profile status empty
      errors.status = 'Status field is required.';
   }

   // profile skills validation
   if (validator.isEmpty(data.skills)) {
      // profile skills empty
      errors.skills = 'Skills field is required.';
   }

   // website validation
   if (!isEmpty(data.website)) {
      if (!validator.isURL(data.website)) {
         errors.website = 'Not a valid URL.';
      }
   }

   // socials validation
   // youtube
   if (!isEmpty(data.youtube)) {
      if (!validator.isURL(data.youtube)) {
         errors.youtube = 'Not a valid URL.';
      }
   }
   //twitter
   if (!isEmpty(data.twitter)) {
      if (!validator.isURL(data.twitter)) {
         errors.twitter = 'Not a valid URL.';
      }
   }
   //facebook
   if (!isEmpty(data.facebook)) {
      if (!validator.isURL(data.facebook)) {
         errors.facebook = 'Not a valid URL.';
      }
   }
   // linkedIn
   if (!isEmpty(data.linkedIn)) {
      if (!validator.isURL(data.linkedIn)) {
         errors.linkedIn = 'Not a valid URL.';
      }
   }
   // instagram
   if (!isEmpty(data.instagram)) {
      if (!validator.isURL(data.instagram)) {
         errors.instagram = 'Not a valid URL.';
      }
   }

   return {
      errors,
      isValid: isEmpty(errors)
   }
};

module.exports = validateProfileInput;
