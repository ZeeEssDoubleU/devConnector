import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
   static propTypes = {
      authState: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
   };

	componentDidMount() {
		// if user already logged in, redirect them to dashboard
		if (this.props.authState.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	render() {
		return (
			<div className="landing">
				<div className="dark-overlay inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h1 className="display-3 mb-4">Developer Connector</h1>
								<p className="lead">
									Create a developer profile/portfolio, share posts and get help from other
									developers
								</p>
								<hr />
								<Link to="/register" className="btn btn-lg btn-info mr-2">
									Sign Up
								</Link>
								<Link to="/login" className="btn btn-lg btn-light">
									Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	authState: state.authState,
});

Landing = connect(
	mapStateToProps,
)(Landing);

export default Landing;
