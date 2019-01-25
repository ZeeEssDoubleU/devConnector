import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = props => {
	// get first name
	const firstName = props.profile.user.name.trim().split(" ")[0];

	// skill list
	const skills = props.profile.skills.map((skill, index) => (
		<div key={index} className="p-3">
			<i className="fa fa-check" /> {skill}
		</div>
	));

	return (
		<div className="row">
			<div className="col-md-12">
				<div className="card card-body bg-light mb-3">
					<h3 className="text-center text-info">
						{firstName}
						's Bio
					</h3>
					{props.profile.bio === "" ? (
						<p className="lead">{firstName} doesn't have a bio.</p>
					) : (
						<p className="lead">{props.profile.bio}</p>
					)}
					<hr />
					<h3 className="text-center text-info">Skill Set</h3>
					<div className="row">
						<div className="d-flex flex-wrap justify-content-center align-items-center">
							{skills}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
