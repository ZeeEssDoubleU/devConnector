import React, { Component } from "react";
import PropTypes from "prop-types";
// import components
import PostItem from "./PostItem.js";

class PostFeed extends Component {
	render() {
      const { posts } = this.props;
      console.log('POSTS:', posts);

		return posts.map(post => <PostItem key={post._id} post={post} />);
	}
}

PostFeed.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default PostFeed;