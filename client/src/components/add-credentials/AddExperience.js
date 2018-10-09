import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup.js";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";

class AddExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: "",
			title: "",
			location: "",
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
		console.log("Experience submitted!");
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Add Experience</h1>
							<p className="lead text-center">
								Add any job or position that you have had in the past or current.
							</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
								/>
								<TextFieldGroup
									placeholder="* Job Title"
									name="title"
									value={this.state.title}
									onChange={this.onChange}
									error={errors.title}
								/>
								<TextFieldGroup
									placeholder="* Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
								/>
								<h6>From Date:</h6>
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
										Current Job
									</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Job Description"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
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

AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors,
});

AddExperience = withRouter(connect(mapStateToProps)(AddExperience));

export default AddExperience;
