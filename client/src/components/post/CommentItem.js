import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import actions
import { likeComment, unlikeComment, deleteComment } from "../../actions/postActions.js";

class CommentItem extends Component {
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
		const { auth, comment } = this.props;
      const postId = this.props.match.params.id;
      console.log('POSTID', postId);
      console.log('COMMENTID', comment._id);

		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<Link to="profile.html">
							<img
								className="rounded-circle d-none d-md-block"
								src={comment.avatar}
								alt="User Avatar"
							/>
						</Link>
						<br />
						<p className="text-center">{comment.name}</p>
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
								{comment.user === auth.user.id ? (
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

CommentItem.defaultProps = {
	showActions: true,
};

CommentItem.propTypes = {
	likeComment: PropTypes.func.isRequired,
	unlikeComment: PropTypes.func.isRequired,
	deleteComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

CommentItem = withRouter(
	connect(
		mapStateToProps,
		{ likeComment, unlikeComment, deleteComment },
	)(CommentItem),
);

export default CommentItem;
