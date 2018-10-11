import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileHeader extends Component {
   render() {
      return (
         <div>
            <h1>TODO: PROFILE HEADER</h1>
         </div>
      );
   }
}

ProfileHeader.propTypes = {

};

ProfileHeader = withRouter(
   connect(

   )(ProfileHeader)
);

export default ProfileHeader;