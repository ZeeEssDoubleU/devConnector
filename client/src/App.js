import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken.js';
import * as authActions from './actions/authActions.js';

// import components
import Navbar from "./components/layout/Navbar.js";
import Landing from "./components/layout/Landing.js";
import Footer from "./components/layout/Footer.js";
import Register from "./components/auth/Register.js";
import Login from "./components/auth/Login.js";

// import stylesheet
import "./App.css"

class App extends Component {
   componentDidMount() {
      // check for token
      if (localStorage.jwtToken) {
         // set token to 'authorization' header
         setAuthToken(localStorage.jwtToken);
         // decode token and get user info and expiration
         const decoded = jwt_decode(localStorage.jwtToken);
         // set current user
         this.props.setCurrentUser(decoded);

         // check for expired token
         const currentTime = Date.now() / 1000;
         if (currentTime >= decoded.exp) {
            // logout current user
            this.props.logoutUser(this.props.history);
            // TODO: clear current profile

         }
      }
   }

   render() {
      return (
         <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
               <Route exact path="/register" component={Register} />
               <Route exact path="/login" component={Login} />
            </div>
            <Footer />
         </div>
      );
   }
}

App.propTypes = {
   setCurrentUser: PropTypes.func.isRequired,
   logoutUser: PropTypes.func.isRequired,
}

App = withRouter(
   connect(
      null,
      authActions
   )(App)
);

export default App;
