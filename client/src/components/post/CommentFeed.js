import React, { Component } from "react";
import PropTypes from "prop-types";
// import components
import CommentItem from "./CommentItem.js";

class CommentFeed extends Component {
	render() {
		const { comments } = this.props;
		console.log("COMMENTS", comments);
		const feedContent = comments.map(comment => (
			<CommentItem key={comment._id} comment={comment} />
		));

		return <div className="comments">{feedContent}</div>;
	}
}

CommentFeed.propTypes = {
	comments: PropTypes.array.isRequired,
};

export default CommentFeed;
