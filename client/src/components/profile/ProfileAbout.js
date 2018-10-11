import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileAbout extends Component {
   render() {
      return (
         <div>
            <h1>TODO: PROFILE ABOUT</h1>
         </div>
      );
   }
}

ProfileAbout.propTypes = {
   
};

ProfileAbout = withRouter(
   connect(
      
   )(ProfileAbout)
);

export default ProfileAbout;