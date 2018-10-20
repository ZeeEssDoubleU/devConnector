import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import actions
import { getPost } from "../../actions/postActions.js";
// import components
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import PostItem from "../posts/PostItem.js";
import Spinner from "../common/Spinner.js";

class Post extends Component {
	componentDidMount() {
		// get post by post id (url param)
		this.props.getPost(this.props.match.params.id);
	}

	render() {
		const { post, loading } = this.props.posting;
		let postContent; // initialize variable to populate component below

		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner />;
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed comments={post.comments} />
				</div>
			);
		}

		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/feed" className="btn btn-light">
								&#8592; Back to Feed
							</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	posting: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	posting: state.posting,
});

Post = connect(
	mapStateToProps,
	{ getPost },
)(Post);

export default Post;
