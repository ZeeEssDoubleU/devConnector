import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import components
import PostForm from "./PostForm.js";
import PostFeed from "./PostFeed.js";
import Spinner from "../common/Spinner.js";
// import actions
import { getPosts } from "../../actions/postActions.js";

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		const { posts, loading } = this.props.postState;
		let postContent;

		if (posts === null || loading) {
			postContent = <Spinner />;
		} else {
			postContent = <PostFeed posts={posts} />;
		}

		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	postState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	postState: state.postState,
});

Posts = connect(
	mapStateToProps,
	{ getPosts },
)(Posts);

export default Posts;
