import React from 'react';
import PropTypes from 'prop-types';

const SelectListGroup = (props) => {
   const selectOptions = props.options.map(option => {
      if (option.value === '') {
         return (
            <option key={option.label} value={option.value} disabled>
               {option.label}
            </option>
         );
      } else {
         return (
            <option key={option.label} value={option.value}>
               {option.label}
            </option>
         );
      }
   });

   return (
      <div className="form-group">
         <select
            className={
               "form-control form-control-lg" +
               (props.error ? " is-invalid" : '')
            }
            name={ props.name }
            value={ props.value }
            onChange={ props.onChange }
            required={ props.required }
         >
            {selectOptions}
         </select>
         { props.info && <small className="form-text text-muted">{ props.info }</small> }
         { props.error && <div className="invalid-feedback">{ props.error }</div> }
      </div>
   );
}

SelectListGroup.propTypes = {
   name: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   error: PropTypes.string,
   info: PropTypes.string,
   onChange: PropTypes.func.isRequired,
   options: PropTypes.array.isRequired,
   required: PropTypes.bool,
}

export default SelectListGroup;
