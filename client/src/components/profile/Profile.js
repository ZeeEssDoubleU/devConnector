import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import ProfileHeader from "./ProfileHeader.js";
import ProfileAbout from "./ProfileAbout.js";
import ProfileCreds from "./ProfileCreds.js";
import ProfileGithub from "./ProfileGithub.js";
import Spinner from "../common/Spinner.js";

import * as profileActions from "../../actions/profileActions.js";

class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}

	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;

		if (profile === null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
								&#8592; Back To Profiles
							</Link>
						</div>
					</div>
					<ProfileHeader profile={profile}/>
					<ProfileAbout />
					<ProfileCreds />
					<ProfileGithub />
				</div>
			);
		}

		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{profileContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	getProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
});

Profile = connect(
	mapStateToProps,
	{ ...profileActions },
)(Profile);

export default Profile;
