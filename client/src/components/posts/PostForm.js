import React, { useState, useReducer, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import components
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
// import actions
import { addPost } from "../../actions/postActions.js";

const PostForm = props => {
	const [text, setText] = useState("");
	const [errors, setErrors] = useState();

	const onSubmit = event => {
		event.preventDefault();
		const { user } = props.authState;
		const newPost = {
			text,
			avatar: user.avatar,
		};

		props.addPost(newPost);
		setText("");
	};

	const onChange = event => {
		setText(event.target.value);
	};

	// when errors received, pushes them to component state. State then pushes them to TextAreaFieldGroup below to be displayed
	useEffect(() => {
		setErrors(props.errorState.text);
	}, [props.errorState]);

	return (
		<div className="post-form mb-3">
			<div className="card card-info">
				<div className="card-header bg-info text-white">
					Say something...
				</div>
				<div className="card-body">
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<TextAreaFieldGroup
								placeholder="Create a post"
								name="text"
								value={text}
								onChange={onChange}
								error={errors}
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
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	authState: PropTypes.object.isRequired,
	errorState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	authState: state.authState,
	errorState: state.errorState,
});

export default connect(mapStateToProps, { addPost })(PostForm);
