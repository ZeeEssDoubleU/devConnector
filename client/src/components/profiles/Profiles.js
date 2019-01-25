import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner.js";

// import actions
import { getProfiles } from "../../actions/profileActions.js";

// import components
import ProfileItem from "./ProfileItem.js";

class Profiles extends Component {
   static propTypes = {
      getProfiles: PropTypes.func.isRequired,
      profileState: PropTypes.object.isRequired,
   };

	componentDidMount() {
		this.props.getProfiles();
	}

	render() {
      const { profiles, loading } = this.props.profileState;
		let profileItems; // initialize for use below

		if (profiles === null || loading) {
			profileItems = <Spinner />;
		} else {
			if (profiles.length > 0) {
				profileItems = profiles.map(profile => (
					<ProfileItem key={profile._id} profile={profile} />
				));
			} else {
				profileItems = <h4>No profiles found...</h4>;
			}
		}

		return (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Developer Profiles</h1>
							<p className="lead text-center">Browse and connect with developers.</p>
							{profileItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	profileState: state.profileState,
});

Profiles = connect(
	mapStateToProps,
	{ getProfiles },
)(Profiles);

export default Profiles;
