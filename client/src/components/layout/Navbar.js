import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import actions
import { logoutUser } from "../../actions/authActions.js";
import { clearCurrentProfile } from "../../actions/profileActions.js";

class Navbar extends Component {
	onLogoutClick = event => {
		event.preventDefault();
		// logout current user
		this.props.logoutUser(this.props.history);
		// clear current profile
		this.props.clearCurrentProfile();
	};

	render() {
		const { isAuthenticated, user } = this.props.authState;

		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/feed">
						Post Feed
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<a href="" className="nav-link" onClick={this.onLogoutClick}>
						<img
							src={user.avatar}
							alt={user.name}
							title="You must have a Gravatar connected to your email to display an image."
							style={{ width: "25px", marginRight: "5px", borderRadius: "50%" }}
						/>
						Logout
					</a>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Sign Up
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
					</Link>
				</li>
			</ul>
		);

		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">
						DevConnector
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav">
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/profiles">
									Developers
								</Link>
							</li>
						</ul>
						{isAuthenticated ? authLinks : guestLinks}
					</div>
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	clearCurrentProfile: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	authState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	authState: state.authState,
});

Navbar = withRouter(
	connect(
		mapStateToProps,
		{ clearCurrentProfile, logoutUser },
	)(Navbar),
);

export default Navbar;
