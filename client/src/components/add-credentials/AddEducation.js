import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextFieldGroup } from '../common/TextFieldGroup.js';
import { TextAreaFieldGroup } from '../common/TextAreaFieldGroup.js';

class AddEducation extends Component {
   constructor(props) {
      super(props);
         this.state = {
            school: '',
            degree: '',
            fieldOfStudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false,
         };
   }

   render() {
      return (

      );
   }
}

AddEducation.propTypes = {

};

export default AddEducation;
