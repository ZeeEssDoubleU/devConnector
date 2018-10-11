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
		return (
			<div>
				<ProfileHeader />
				<ProfileAbout />
				<ProfileCreds />
				<ProfileGithub />
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
