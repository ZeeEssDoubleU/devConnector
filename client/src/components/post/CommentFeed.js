import React, { Component } from "react";
import PropTypes from "prop-types";
// import components
import CommentItem from "./CommentItem.js";

class CommentFeed extends Component {
   render() {
      const { posts } = this.props;
      return posts.map(post => <CommentItem key={ post._id } post={ post } />);
   }
}

CommentFeed.propTypes = {
   posts: PropTypes.array.isRequired,
};

export default CommentFeed;
