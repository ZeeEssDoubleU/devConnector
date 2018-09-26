import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions.js';

class Login extends Component {
   constructor() {
      super();
      this.state = {
         email: "",
         password: "",
         errors: {},
      };
   }

   onChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      });
   };

   onSubmit = (event) => {
      event.preventDefault();
      const User = {
         email: this.state.email,
         password: this.state.password,
      };
      this.props.loginUser(User);
   };

   componentDidMount() {
      // if user already logged in, redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
         this.props.history.push('/dashboard');
      }
   }

   componentWillReceiveProps(nextProps) {
      // if user logged in, redirect them to dashboard
      if (nextProps.auth.isAuthenticated) {
         this.props.history.push('./dashboard');
      }

      if (nextProps.errors) {
         this.setState({ errors: nextProps.errors });
      }
   }

   render() {
      const { errors } = this.state;
      return (
         <div className="login">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <h1 className="display-4 text-center">Log In</h1>
                     <p className="lead text-center">Sign in to your DevConnector account</p>
                     <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                           <input
                              type="email"
                              className={
                                 "form-control form-control-lg" +
                                 (errors.email ? " is-invalid" : null)
                              }
                              placeholder="Email Address"
                              name="email"
                              value={ this.state.email }
                              onChange={ this.onChange }
                           />
                           { errors.email
                              && <div className="invalid-feedback">{errors.email}</div>
                           }
                        </div>
                        <div className="form-group">
                           <input
                              type="password"
                              className={
                                 "form-control form-control-lg" +
                                 (errors.password ? " is-invalid" : null)
                              }
                              placeholder="Password"
                              name="password"
                              value={ this.state.password }
                              onChange={ this.onChange }
                           />
                           { errors.password
                              && <div className="invalid-feedback">{errors.password}</div>
                           }
                        </div>
                        <input
                           type="submit"
                           className="btn btn-info btn-block mt-4"
                        />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

Login.propTypes = {
   loginUser: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
   auth: state.auth,
   errors: state.errors,
});

Login = connect(
   mapStateToProps,
   authActions
)(Login);

export default Login;
