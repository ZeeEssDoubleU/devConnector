import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import components
import TextFieldGroup from "../common/TextFieldGroup.js";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
import InputGroup from "../common/InputGroup.js";
import SelectListGroup from "../common/SelectListGroup.js";
// import actions
import { createProfile } from "../../actions/profileActions.js";

class CreateProfile extends Component {
	static propTypes = {
		createProfile: PropTypes.func.isRequired,
		errorState: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: "",
			company: "",
			website: "",
			location: "",
			status: "",
			skills: "",
			githubUserName: "",
			bio: "",
			twitter: "",
			facebook: "",
			linkedin: "",
			youtube: "",
			instagram: "",
			errors: {},
		};
	}

	onChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errorState) {
			this.setState({ errors: nextProps.errorState });
		}
	}

	onSubmit = event => {
		event.preventDefault();
		// call createProfile action.  Don't have to import withRouter for history, because withRouter already imported to PrivateRoute.
		this.props.createProfile(this.state, this.props.history);
	};

	toggleSocialInputs = () => {
		this.setState({ displaySocialInputs: !this.state.displaySocialInputs });
	};

	render() {
		const { errors, displaySocialInputs } = this.state;

		// toggle social inputs and socialToggleButton text based on displaySocialInputs state
		let socialToggleButton;
		let socialInputs;
		if (displaySocialInputs) {
			socialToggleButton = "Hide Social Network Links";
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-fw fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder="Facebook Profile URL"
						name="facebook"
						icon="fab fa-fw fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="LinkedIn Profile URL"
						name="linkedin"
						icon="fab fa-fw fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
					<InputGroup
						placeholder="YouTube Profile URL"
						name="youtube"
						icon="fab fa-fw fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					<InputGroup
						placeholder="Instagram Profile URL"
						name="instagram"
						icon="fab fa-fw fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			);
		} else {
			socialToggleButton = "Show Social Network Links";
		}

		// select options for status
		const options = [
			{ label: "* Select Professional Status", value: "" },
			{ label: "Developer", value: "Developer" },
			{ label: "Junior Developer", value: "Junior Developer" },
			{ label: "Senior Developer", value: "Senior Developer" },
			{ label: "Manager", value: "Manager" },
			{ label: "Student or Learning", value: "Student or Learning" },
			{ label: "Instructor or Teacher", value: "Instructor or Teacher" },
			{ label: "Intern", value: "Intern" },
			{ label: "Other", value: "Other" },
		];

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create your profile.</h1>
							<p className="lead text-center">
								Let's get some information to make your profile stand out.
							</p>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique name for your profile URL.  Your full name, company name, nickname, etc."
								/>
								<SelectListGroup
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									options={options}
									error={errors.status}
									info="Give us an idea of where you are in your career."
								/>
								<TextFieldGroup
									name="skills"
									placeholder="* Skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)."
								/>
								<TextFieldGroup
									name="company"
									placeholder="Company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="Could be your own company or one that you work for."
								/>
								<TextFieldGroup
									name="website"
									placeholder="Website"
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Could be your own or a company website."
								/>
								<TextFieldGroup
									name="location"
									placeholder="Location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="City and state suggested (eg. Dallas, TX)."
								/>
								<TextFieldGroup
									name="githubUserName"
									placeholder="Github Username"
									value={this.state.githubUserName}
									onChange={this.onChange}
									error={errors.githubUserName}
									info="If you want your latest repos and a Github link, include your username."
								/>
								<TextAreaFieldGroup
									name="bio"
									placeholder="A short bio of yourself"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little about yourself."
								/>

								<div className="mb-3">
									<button
										className="btn btn-light"
										type="button"
										onClick={this.toggleSocialInputs}>
										{socialToggleButton}
									</button>
									<span className="text-muted">Optional</span>
								</div>
								{socialInputs}

								<button type="submit" className="btn btn-info btn-block mt-4">
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	errorState: state.errorState,
});

CreateProfile = connect(
	mapStateToProps,
	{ createProfile },
)(CreateProfile);

export default CreateProfile;
