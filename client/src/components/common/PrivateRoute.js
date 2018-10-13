import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

let PrivateRoute = ({ component: Component, auth, ...rest }) => {
   return (
      <Route
         {...rest}
         render = {props =>
            auth.isAuthenticated === true
               ? <Component {...props} /> 
               : <Redirect to='/login' />
         }
      />
   );
};

PrivateRoute.propTypes = {
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
   auth: state.auth,
});

PrivateRoute = withRouter(
   connect(
      mapStateToProps
   )(PrivateRoute)
);

export default PrivateRoute;
