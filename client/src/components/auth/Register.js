import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import actions
import { registerUser } from "../../actions/authActions.js";
// import components
import TextFieldGroup from "../common/TextFieldGroup.js";

class Register extends Component {
	static propTypes = {
		registerUser: PropTypes.func.isRequired,
		authState: PropTypes.object.isRequired,
		errorState: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
	};

	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {},
		};
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="register">
				<div className="dark-overlay inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<h1 className="display-4 text-center">Sign Up</h1>
								<p className="lead text-center">
									Create your DevConnector account
								</p>
								<form onSubmit={this.onSubmit} noValidate>
									<TextFieldGroup
										type="text"
										placeholder="Name"
										name="name"
										value={this.state.name}
										onChange={this.onChange}
										error={errors.name}
									/>
									<TextFieldGroup
										type="email"
										placeholder="Email"
										name="email"
										value={this.state.email}
										onChange={this.onChange}
										error={errors.email}
										info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
									/>
									<TextFieldGroup
										type="password"
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.onChange}
										error={errors.password}
									/>
									<TextFieldGroup
										type="password"
										placeholder="Confirm Password"
										name="password2"
										value={this.state.password2}
										onChange={this.onChange}
										error={errors.password2}
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
	}

	onChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	onSubmit = event => {
		event.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};

		this.props.registerUser(newUser, this.props.history);
	};

	componentDidMount() {
		// if user already logged in, redirect them to dashboard
		if (this.props.authState.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errorState) {
			this.setState({ errors: nextProps.errorState });
		}
	}
}

const mapStateToProps = state => ({
	authState: state.authState,
	errorState: state.errorState,
});

Register = withRouter(
	connect(
		mapStateToProps,
		{ registerUser },
	)(Register),
);

export default Register;
