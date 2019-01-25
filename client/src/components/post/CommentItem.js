import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import actions
import { likeComment, unlikeComment, deleteComment } from "../../actions/postActions.js";

class CommentItem extends Component {
	static propTypes = {
		likeComment: PropTypes.func.isRequired,
		unlikeComment: PropTypes.func.isRequired,
		deleteComment: PropTypes.func.isRequired,
		authState: PropTypes.object.isRequired,
		comment: PropTypes.object.isRequired,
   };
   
   static defaultProps = {
      showActions: true,
   };

	onLikeClick = (postId, commentId) => {
		this.props.likeComment(postId, commentId);
	};

	onUnlikeClick = (postId, commentId) => {
		this.props.unlikeComment(postId, commentId);
	};

	onDeleteClick = (postId, commentId) => {
		this.props.deleteComment(postId, commentId);
	};

	findUserLike = likes => {
		const { authState } = this.props;
		if (likes) {
			if (likes.filter(like => like.user === authState.user.id).length > 0) {
				return true;
			} else {
				return false;
			}
		}
	};

	render() {
		const { authState, comment } = this.props;
		const postId = this.props.match.params.id;

		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<Link
							to={
								comment.user.handle === ""
									? "/no-profile"
									: `/profile/${comment.user.handle}`
							}>
							<img
								className="rounded-circle d-none d-md-block"
								src={comment.user.avatar ? comment.user.avatar : comment.avatar}
								alt="User Avatar"
							/>
						</Link>
						<br />
						<p className="text-center">
							{comment.user
								? comment.user.handle === ""
									? comment.name
									: comment.user.handle
								: comment.name}
						</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{comment.text}</p>
						<div>
							<button
								onClick={() => this.onLikeClick(postId, comment._id)}
								type="button"
								className="btn btn-light mr-1">
								<i
									className={
										this.findUserLike(comment.likes)
											? "text-info fas fa-thumbs-up"
											: "fas fa-thumbs-up"
									}
								/>
								{comment.likes ? (
									<span className="badge badge-light">{comment.likes.length}</span>
								) : null}
							</button>
							<button
								onClick={() => this.onUnlikeClick(postId, comment._id)}
								type="button"
								className="btn btn-light mr-1">
								<i className="text-secondary fas fa-thumbs-down" />
							</button>
							<span>
								{comment.user._id === authState.user.id ? (
									<button
										onClick={() => this.onDeleteClick(postId, comment._id)}
										type="button"
										className="btn btn-danger mr-1">
										<i className="fas fa-times" />
									</button>
								) : null}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	authState: state.authState,
});

CommentItem = withRouter(
	connect(
		mapStateToProps,
		{ likeComment, unlikeComment, deleteComment },
	)(CommentItem),
);

export default CommentItem;
