import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.js";
// import actions
import { clearCurrentProfile } from "./actions/profileActions.js";
import { logoutUser } from "./actions/authActions.js";
import { setCurrentUser } from "./actions/authActions.js";
// import components
import PrivateRoute from "./components/common/PrivateRoute.js";
import Navbar from "./components/layout/Navbar.js";
import Landing from "./components/layout/Landing.js";
import Footer from "./components/layout/Footer.js";
import Register from "./components/auth/Register.js";
import Login from "./components/auth/Login.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import CreateProfile from "./components/profile-manage/CreateProfile.js";
import EditProfile from "./components/profile-manage/EditProfile.js";
import AddExperience from "./components/add-credentials/AddExperience.js";
import AddEducation from "./components/add-credentials/AddEducation.js";
import Profiles from "./components/profiles/Profiles.js";
import Profile from "./components/profile/Profile.js";
import Posts from "./components/posts/Posts.js";
import Post from "./components/post/Post.js";
import NotFound from "./components/not-found/NotFound.js";

// import stylesheet
import "./App.css";

class App extends Component {
	componentWillMount() {
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
				// clear current profile
				this.props.clearCurrentProfile();
			}
		}
	}

	render() {
		return (
			<div className="App">
				<Navbar />
				<Route exact path="/" component={Landing} />
				<div className="container">
					<Switch>
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/profiles" component={Profiles} />
						<Route exact path="/profile/:handle" component={Profile} />
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
						<PrivateRoute exact path="/create-profile" component={CreateProfile} />
						<PrivateRoute exact path="/edit-profile" component={EditProfile} />
						<PrivateRoute exact path="/add-experience" component={AddExperience} />
						<PrivateRoute exact path="/add-education" component={AddEducation} />
						<PrivateRoute exact path="/post/:id" component={Post} />
						<PrivateRoute exact path="/feed" component={Posts} />
						<Route component={NotFound} />
					</Switch>
				</div>
				<Footer />
			</div>
		);
	}
}

App.propTypes = {
	clearCurrentProfile: PropTypes.func.isRequired,
	logoutUser: PropTypes.func,
	setCurrentUser: PropTypes.func,
};

App = withRouter(
	connect(
		null,
		{ clearCurrentProfile, logoutUser, setCurrentUser },
	)(App),
);

export default App;
