import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import actions
import { getPost, getComments } from "../../actions/postActions.js";
// import components
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import PostItem from "../posts/PostItem.js";
import Spinner from "../common/Spinner.js";

class Post extends Component {
	static propTypes = {
		getPost: PropTypes.func.isRequired,
		getComments: PropTypes.func.isRequired,
		postState: PropTypes.object.isRequired,
	};

	componentDidMount() {
		// get post by post id (url param)
		this.props.getPost(this.props.match.params.id);
		this.props.getComments(this.props.match.params.id);
	}

	render() {
		const { post, comments, loading } = this.props.postState;
		let postContent; // initialize variable to populate component below

		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner />;
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed comments={comments} />
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

const mapStateToProps = state => ({
	postState: state.postState,
});

Post = connect(
	mapStateToProps,
	{ getPost, getComments },
)(Post);

export default Post;
