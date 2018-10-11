import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
   render() {
      return (
         <div>
            <h1>TODO: PROFILE GITHUB</h1>
         </div>
      );
   }
}

ProfileGithub.propTypes = {

};

ProfileGithub = withRouter(
   connect(

   )(ProfileGithub)
);

export default ProfileGithub;