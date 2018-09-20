import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// import components
import Navbar from "./components/layout/Navbar.js";
import Landing from "./components/layout/Landing.js";
import Footer from "./components/layout/Footer.js";
import Register from "./components/auth/Register.js";
import Login from "./components/auth/Login.js";

// import stylesheet
import "./App.css";

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
