import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

let PrivateRoute = ({ component: Component, authState, ...rest }) => {
   return (
      <Route
         {...rest}
         render = {props =>
            authState.isAuthenticated === true
               ? <Component {...props} /> 
               : <Redirect to='/login' />
         }
      />
   );
};

PrivateRoute.propTypes = {
   authState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
   authState: state.authState,
});

PrivateRoute = withRouter(
   connect(
      mapStateToProps
   )(PrivateRoute)
);

export default PrivateRoute;
