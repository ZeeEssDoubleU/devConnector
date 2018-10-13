import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import components
import TextFieldGroup from "../common/TextFieldGroup.js";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
// import actions
import { addEducation } from "../../actions/profileActions.js";

class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: "",
			degree: "",
			fieldOfStudy: "",
			from: "",
			to: "",
			current: false,
			description: "",
			errors: {},
		};
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	onCheck = () => {
		this.setState({
			current: !this.state.current,
		});
	};

	onSubmit = (event) => {
		event.preventDefault();
		this.props.addEducation(this.state, this.props.history);
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								&#8592; Go Back
							</Link>
							<h1 className="display-4 text-center">Add Education</h1>
							<p className="lead text-center">
								Add any school, bootcamp, course, etc. that you have attended.
							</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* School"
									name="school"
									value={this.state.school}
									onChange={this.onChange}
									error={errors.school}
								/>
								<TextFieldGroup
									placeholder="* Degree or Certification"
									name="degree"
									value={this.state.degree}
									onChange={this.onChange}
									error={errors.degree}
								/>
								<TextFieldGroup
									placeholder="* Field of Study"
									name="fieldOfStudy"
									value={this.state.fieldOfStudy}
									onChange={this.onChange}
									error={errors.fieldOfStudy}
								/>
								<h6>* From Date:</h6>
								<TextFieldGroup
									placeholder="* From"
									name="from"
									type="date"
									value={this.state.from}
									onChange={this.onChange}
									error={errors.from}
								/>
								<h6>To Date:</h6>
								<TextFieldGroup
									placeholder="* To"
									name="to"
									type="date"
									value={this.state.to}
									onChange={this.onChange}
									error={errors.to}
									disabled={this.state.current ? true : false}
								/>
								<div className="form-check mb-4">
									<input
										type="checkbox"
										className="form-check-input"
										name="current"
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
										id="current"
									/>
									<label htmlFor="current" className="form-check-label">
										Currently Enrolled
									</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Program Description"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
									info="Tell us more about the program that you attended."
								/>
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

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors,
});

AddEducation = withRouter(
	connect(
		mapStateToProps,
		{ addEducation },
	)(AddEducation),
);

export default AddEducation;
