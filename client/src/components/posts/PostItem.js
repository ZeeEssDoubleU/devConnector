import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import actions
import { likePost, unlikePost, deletePost } from "../../actions/postActions.js";

class PostItem extends Component {
	onLikeClick = id => {
		this.props.likePost(id);
	};

	onUnlikeClick = id => {
		this.props.unlikePost(id);
	};

	onDeleteClick = id => {
		this.props.deletePost(id);
	};

	findUserLike = likes => {
		const { auth } = this.props;
		if (likes) {
			if (likes.filter(like => like.user === auth.user.id).length > 0) {
				return true;
			} else {
				return false;
			}
		}
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
						<div>
							<button
								onClick={() => this.onLikeClick(post._id)}
								type="button"
								className="btn btn-light mr-1">
								<i
									className={
										this.findUserLike(post.likes)
											? "text-info fas fa-thumbs-up"
											: "fas fa-thumbs-up"
									}
								/>
								{post.likes ? (
									<span className="badge badge-light">{post.likes.length}</span>
								) : null}
							</button>
							<button
								onClick={() => this.onUnlikeClick(post._id)}
								type="button"
								className="btn btn-light mr-1">
								<i className="text-secondary fas fa-thumbs-down" />
							</button>

							{/* render if url has id param */}
							{this.props.match.params.id ? null : (
								<span>
									<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
										Comments {`(${post.comments.length})`}
									</Link>
									{post.user === auth.user.id ? (
										<button
											onClick={() => this.onDeleteClick(post._id)}
											type="button"
											className="btn btn-danger mr-1">
											<i className="fas fa-times" />
										</button>
									) : null}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PostItem.propTypes = {
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

PostItem = withRouter(
	connect(
		mapStateToProps,
		{ likePost, unlikePost, deletePost },
	)(PostItem),
);

export default PostItem;
