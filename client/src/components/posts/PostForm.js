import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import components
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
// import actions
import { addPost } from "../../actions/postActions.js";

class PostForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: "",
			errors: {},
		};
	}

	onSubmit = event => {
		event.preventDefault();
		const { user } = this.props.auth;
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};

		this.props.addPost(newPost);
		this.setState({
			text: "",
		});
	};

	onChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Something...</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextAreaFieldGroup
									placeholder="Create a post"
									name="text"
									value={this.state.text}
									onChange={this.onChange}
									error={errors.text}
								/>
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

PostForm = connect(
	mapStateToProps,
	{ addPost },
)(PostForm);

export default PostForm;
