import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileCreds extends Component {
   render() {
      return (
         <div>
            <h1>TODO: PROFILE CREDS</h1>
         </div>
      );
   }
}

ProfileCreds.propTypes = {

};

ProfileCreds = withRouter(
   connect(

   )(ProfileCreds)
);

export default ProfileCreds;