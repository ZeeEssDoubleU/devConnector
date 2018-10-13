import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
// import actions
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
	onDeleteClick = id => {
		this.props.deleteEducation(id);
	};

	render() {
		const education = this.props.education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>{edu.fieldOfStudy}</td>
				<td>
					<Moment format="YYYY/MM/DD">{edu.from}</Moment>
					{" - "}
					{edu.current ? "Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
				</td>
				<td style={{ textAlign: "right" }}>
					<button onClick={() => this.onDeleteClick(edu._id)} className="btn btn-danger">
						Delete
					</button>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 className="mb-4">Education Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Field of Study</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{education}</tbody>
				</table>
			</div>
		);
	}
}

Education.propTypes = {
	deleteEducation: PropTypes.func.isRequired,
};

Education = connect(
	null,
	{ deleteEducation },
)(Education);

export default Education;
