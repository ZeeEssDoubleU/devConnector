import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
// import actions
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
	static propTypes = {
		deleteExperience: PropTypes.func.isRequired,
	};

	onDeleteClick = id => {
		this.props.deleteExperience(id);
	};

	render() {
		const experience = this.props.experience.map(exp => (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment>
					{" - "}
					{exp.current ? "Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
				</td>
				<td style={{ textAlign: "right" }}>
					<button onClick={() => this.onDeleteClick(exp._id)} className="btn btn-danger">
						Delete
					</button>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 className="mb-4">Experience Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{experience}</tbody>
				</table>
			</div>
		);
	}
}

Experience = connect(
	null,
	{ deleteExperience },
)(Experience);

export default Experience;
