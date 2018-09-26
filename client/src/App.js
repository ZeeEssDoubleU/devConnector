import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken.js';
import * as actions from './actions';
import { Provider } from "react-redux";
import store from "./store";

// import components
import Navbar from "./components/layout/Navbar.js";
import Landing from "./components/layout/Landing.js";
import Footer from "./components/layout/Footer.js";
import Register from "./components/auth/Register.js";
import Login from "./components/auth/Login.js";

// import stylesheet
import "./App.css"

// check for token
if(localStorage.jwtToken) {
   // set token to 'authorization header
   setAuthToken(localStorage.jwtToken);
   // decode token and get user info and expiration
   const decoded = jwt_decode(localStorage.jwtToken);
   // set current user
   store.dispatch(actions.setCurrentUser(decoded));
}

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <BrowserRouter>
               <div className="App">
                  <Navbar />
                  <Route exact path="/" component={Landing} />
                  <div className="container">
                     <Route exact path="/register" component={Register} />
                     <Route exact path="/login" component={Login} />
                  </div>
                  <Footer />
               </div>
            </BrowserRouter>
         </Provider>
      );
   }
}

export default App;
