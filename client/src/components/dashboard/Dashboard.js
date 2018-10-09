import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner.js";
import * as profileActions from "../../actions/profileActions.js";
import ProfileActions from "./ProfileActions.js";
import Experience from "./Experience.js";
import Education from "./Education.js";

class Dashboard extends Component {
	onDeleteClick = (event) => {
		this.props.deleteAccount();
	};

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

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
						<ProfileActions />
						<Experience experience={profile.experience} />
						<div style={{ marginBottom: "60px " }}>
							<button onClick={this.onDeleteClick} className="btn btn-danger">
								Delete My Account
							</button>
						</div>
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
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

Dashboard = connect(
	mapStateToProps,
	profileActions,
)(Dashboard);

export default Dashboard;
