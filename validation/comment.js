const validator = require("validator");
const isEmpty = require("./isEmpty.js");

const validateCommentInput = data => {
   let errors = {};

   // make sure that data fields are strings for Validator
   data.text = !isEmpty(data.text) ? data.text : "";

   // text validation
   if (validator.isEmpty(data.text)) {
      // text empty
      errors.text = "Text field is required.";
   } else if (!validator.isLength(data.text, { min: 5, max: 300 })) {
      // text length
      errors.text = "Comment must be between 5 and 300 characters.";
   }

   return {
      errors,
      isValid: isEmpty(errors),
   };
};

module.exports = validateCommentInput;
