import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import actions
import { loginUser } from "../../actions/authActions.js";
// import components
import TextFieldGroup from "../common/TextFieldGroup.js";

let Login = (props) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [errors, setErrors] = useState();

	const onSubmit = (event) => {
		event.preventDefault();
		const User = {
			email,
			password,
		};
		props.loginUser(User);
	};

	useEffect(() => {
		// if user logged in, redirect them to dashboard
		if (props.authState.isAuthenticated) {
			props.history.push("/dashboard");
		}

		if (props.errorState) {
			setErrors(props.errorState);
		}
	}, [props.authState.isAuthenticated, props.errorState]);

	return (
		<div className="login">
			<div className="dark-overlay inner text-light">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">
								Sign in to your DevConnector account
							</p>
							<form onSubmit={onSubmit}>
								<TextFieldGroup
									type="email"
									placeholder="Email Address"
									name="email"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									error={errors && errors.email}
								/>

								<TextFieldGroup
									type="password"
									placeholder="Password"
									name="password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									error={errors && errors.password}
								/>

								<input
									type="submit"
									className="btn btn-info btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	authState: PropTypes.object.isRequired,
	errorState: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	authState: state.authState,
	errorState: state.errorState,
});

Login = connect(mapStateToProps, { loginUser })(Login);

export default Login;
