import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as profileActions from '../../actions/profileActions.js';

class Dashboard extends Component {
   componentDidMount() {
      this.props.getCurrentProfile();
   }

   render() {
      return (
         <div>
            <h1>Dashboard</h1>
         </div>
      );
   }
}

Dashboard.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
   auth: state.auth,
});

Dashboard = connect(
   mapStateToProps,
   profileActions
)(Dashboard);

export default Dashboard;
