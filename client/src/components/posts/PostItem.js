import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import actions
import { deletePost } from "../../actions/postActions.js";

class PostItem extends Component {
	onDeleteClick = id => {
		this.props.deletePost(id);
	};

	render() {
		const { post, auth } = this.props;

		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<Link to="profile.html">
							<img
								className="rounded-circle d-none d-md-block"
								src={post.avatar}
								alt="User Avatar"
							/>
						</Link>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						<button type="button" className="btn btn-light mr-1">
							<i className="text-info fas fa-thumbs-up" />
							<span className="badge badge-light">{post.likes.length}</span>
						</button>
						<button type="button" className="btn btn-light mr-1">
							<i className="text-secondary fas fa-thumbs-down" />
						</button>
						<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
							Comments {` (${post.comments.length})`}
						</Link>
						{post.user === auth.user.id ? (
							<button
								onClick={() => this.onDeleteClick(post._id)}
								type="button"
								className="btn btn-danger mr-1">
								<i className="fas fa-times" />
							</button>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

PostItem.propTypes = {
	deletePost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

PostItem = connect(
	mapStateToProps,
	{ deletePost },
)(PostItem);

export default PostItem;
