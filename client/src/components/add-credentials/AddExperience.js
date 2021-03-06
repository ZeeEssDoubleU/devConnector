import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import components
import TextFieldGroup from "../common/TextFieldGroup.js";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
// import actions
import {addExperience} from "../../actions/profileActions.js";

class AddExperience extends Component {
   static propTypes = {
      addExperience: PropTypes.func.isRequired,
      errorState: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
   };

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
		this.props.addExperience(this.state, this.props.history);
	};

	componentWillReceiveProps(nextProps) {
      if (nextProps.errorState) {
         this.setState({ errors: nextProps.errorState });
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								&#8592; Back to Dashboard
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
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
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
										Current Job
									</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Job Description"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
									info="Tell us more about the position."
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

const mapStateToProps = (state) => ({
	errorState: state.errorState,
});

AddExperience = withRouter(
	connect(
		mapStateToProps,
		{ addExperience },
	)(AddExperience),
);

export default AddExperience;
