import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner.js";
// import actions
import { getCurrentProfile } from "../../actions/profileActions.js";
import { deleteAccount } from "../../actions/profileActions.js";
// import components
import Experience from "./Experience.js";
import Education from "./Education.js";

class Dashboard extends Component {
	onDeleteClick = event => {
		this.props.deleteAccount();
	};

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	render() {
		const { user } = this.props.authState;
		const { profile, loading } = this.props.profileState;

		let dashboardContent;

		if (profile === null || loading) {
			// show spinner
			dashboardContent = <Spinner />;
		} else {
			// check if logged in user has profile data
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome, <Link to={`/profile/${profile.handle}`}>{user.name}.</Link>
						</p>
						<div className="btn-group mb-4" role="group">
							<Link to="/edit-profile" className="btn btn-light">
								<i className="fas fa-user-circle text-info mr-1" /> Edit Profile
							</Link>
							<Link to="/add-experience" className="btn btn-light">
								<i className="fab fa-black-tie text-info mr-1" />
								Add Experience
							</Link>
							<Link to="/add-education" className="btn btn-light">
								<i className="fas fa-graduation-cap text-info mr-1" />
								Add Education
							</Link>
						</div>
						<button
							onClick={this.onDeleteClick}
							className="btn btn-danger"
							style={{ float: "right" }}>
							Delete Account
						</button>
						<Experience experience={profile.experience} />
						<Education education={profile.education} />
					</div>
				);
			} else {
				// user is logged in, but has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome, {user.name}.</p>
						<p>You have not yet created a profile, please add some info.</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
						<button
							onClick={this.onDeleteClick}
							className="btn btn-danger"
							style={{ float: "right" }}>
							Delete Account
						</button>
					</div>
				);
			}
		}

		return (
			<div>
				<div className="dashboard">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h4 className="display-4">Dashboard</h4>
								{dashboardContent}
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
	deleteAccount: PropTypes.func.isRequired,
	authState: PropTypes.object.isRequired,
	profileState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profileState: state.profileState,
	authState: state.authState,
});

Dashboard = connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount },
)(Dashboard);

export default Dashboard;
