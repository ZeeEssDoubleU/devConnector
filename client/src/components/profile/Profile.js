import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import components
import ProfileHeader from "./ProfileHeader.js";
import ProfileAbout from "./ProfileAbout.js";
import ProfileCreds from "./ProfileCreds.js";
import ProfileGithub from "./ProfileGithub.js";
import Spinner from "../common/Spinner.js";
// import actions
import { getProfileByHandle } from "../../actions/profileActions.js";

class Profile extends Component {
	static propTypes = {
		getProfileByHandle: PropTypes.func.isRequired,
		profileState: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
	};

	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.profileState.profile === null && this.props.profileState.loading) {
			this.props.history.push("/no-profile");
		}
	}

	render() {
		const { profile, loading } = this.props.profileState;
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
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCreds education={profile.education} experience={profile.experience} />
					{profile.githubUserName === "" ? null : (
						<ProfileGithub userName={profile.githubUserName} />
					)}
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

const mapStateToProps = state => ({
	profileState: state.profileState,
});

Profile = connect(
	mapStateToProps,
	{ getProfileByHandle },
)(Profile);

export default Profile;
