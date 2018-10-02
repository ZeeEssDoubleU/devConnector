import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner.js';
import * as profileActions from '../../actions/profileActions.js';

class Dashboard extends Component {
   componentDidMount() {
      this.props.getCurrentProfile();
   }

   render() {
      const { user } = this.props.auth;
      const { profile, loading } = this.props.profile;

      let dashboardContent;

      if (profile === null || loading) {
         // show spinner
         dashboardContent = <Spinner/>;
      } else {
         // check if logged in user has profile data
         if (Object.keys(profile).length > 0) {
            dashboardContent = <h4>TODO: Display Profile</h4>;
         } else {
            // user is logged in, but has no profile
            dashboardContent = (
               <div>
                  <p className="lead text-muted">Welcome, { user.name }.</p>
                  <p>You have not yet created a profile, please add some info.</p>
                  <Link to='/create-profile' className='btn btn-lg btn-info'>
                     Create Profile
                  </Link>
               </div>
            );
         }
      }

      return (<div>
         <div className="dashboard">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <h4 className="display-4">Dashboard</h4>
                     { dashboardContent }
                  </div>
               </div>
            </div>
         </div>
      </div>);
   }
}

Dashboard.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
   auth: state.auth
});

Dashboard = connect(
   mapStateToProps,
   profileActions
)(Dashboard);

export default Dashboard;
