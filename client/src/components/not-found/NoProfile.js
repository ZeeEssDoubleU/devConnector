import React from "react";

const NoProfile = props => {
	return (
		<div>
			<div className="row">
				<div className="col-md-6 col-lg-12">
					<button
						onClick={() => window.history.back()}
						className="btn btn-light mb-3 float-left">
						&#8592; Go Back
					</button>
					<button
						onClick={() => props.history.push("/profiles")}
						className="btn btn-light mb-3 float-right">
						Go to Profiles &#8594;
					</button>
				</div>
			</div>
			<h1 className="display-4">No profile found for user.</h1>
		</div>
	);
};

export default NoProfile;
