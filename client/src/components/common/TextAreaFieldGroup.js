import React from 'react';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = (props) => {
   return (
      <div className="form-group">
         <textarea
            className={
               "form-control form-control-lg" +
               (props.error ? " is-invalid" : '')
            }
            placeholder={ props.placeholder }
            name={ props.name }
            value={ props.value }
            onChange={ props.onChange }
            required={ props.required }
         />
         { props.info && <small className="form-text text-muted">{ props.info }</small> }
         { props.error && <div className="invalid-feedback">{ props.error }</div> }
      </div>
   );
}

TextAreaFieldGroup.propTypes = {
   name: PropTypes.string.isRequired,
   placeholder: PropTypes.string,
   value: PropTypes.string.isRequired,
   error: PropTypes.string,
   info: PropTypes.string,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
}

export default TextAreaFieldGroup;
