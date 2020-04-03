import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import components
import PostForm from "./PostForm.js";
import PostFeed from "./PostFeed.js";
import Spinner from "../common/Spinner.js";
// import actions
import { getPosts } from "../../actions/postActions.js";

const Posts = props => {
	useEffect(() => {
		props.getPosts();
	}, []);

	const { posts, loading } = props.postState;
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
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	postState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	postState: state.postState,
});

export default connect(mapStateToProps, { getPosts })(Posts);
