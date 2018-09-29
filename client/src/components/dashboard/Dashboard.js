import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
         dashboardContent = <h4>Loading...</h4>
      } else {
         dashboardContent = <h4>Hello { user.name }.</h4>
      }

      return (
         <div>
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
