import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import actions
import { loginUser } from "../../actions/authActions.js";
// import components
import TextFieldGroup from "../common/TextFieldGroup.js";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {},
		};
	}

	onChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	onSubmit = event => {
		event.preventDefault();
		const User = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(User);
	};

	componentDidMount() {
		// if user already logged in, redirect them to dashboard
		if (this.props.authState.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		// if user logged in, redirect them to dashboard
		if (nextProps.authState.isAuthenticated) {
			this.props.history.push("./dashboard");
		}

		if (nextProps.errorState) {
			this.setState({ errors: nextProps.errorState });
		}
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Sign in to your DevConnector account</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type="email"
									placeholder="Email Address"
									name="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
								/>

								<TextFieldGroup
									type="password"
									placeholder="Password"
									name="password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>

								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	authState: PropTypes.object.isRequired,
	errorState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	authState: state.authState,
	errorState: state.errorState,
});

Login = connect(
	mapStateToProps,
	{ loginUser },
)(Login);

export default Login;
