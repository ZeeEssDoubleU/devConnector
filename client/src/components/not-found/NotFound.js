import React from "react";

const NotFound = () => {
	return (
		<div>
			<div className="row">
				<div className="col-md-6">
					<button
						onClick={() => window.history.back()}
						className="btn btn-light mb-3 float-left">
						&#8592; Go Back
					</button>
				</div>
			</div>
			<h1 className="display-4">Page Not Found</h1>
			<p>Sorry, this page doesn't exist.</p>
		</div>
	);
};

export default NotFound;
