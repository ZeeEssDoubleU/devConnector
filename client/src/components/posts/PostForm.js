import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import components
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
// import actions
import { addPost } from "../../actions/postActions.js";

class PostForm extends Component {
   static propTypes = {
      addPost: PropTypes.func.isRequired,
      authState: PropTypes.object.isRequired,
      errorState: PropTypes.object.isRequired,
   };

	constructor(props) {
		super(props);

		this.state = {
			text: "",
			errors: {},
		};
	}

	onSubmit = event => {
		event.preventDefault();
      const { user } = this.props.authState;
		const newPost = {
			text: this.state.text,
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
		if (nextProps.errorState) {
			this.setState({
				errors: nextProps.errorState,
			});
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say something...</div>
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

const mapStateToProps = state => ({
	authState: state.authState,
	errorState: state.errorState,
});

PostForm = connect(
	mapStateToProps,
	{ addPost },
)(PostForm);

export default PostForm;
