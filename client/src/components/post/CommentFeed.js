import React from "react";
import PropTypes from "prop-types";
// import components
import CommentItem from "./CommentItem.js";

const CommentFeed = props => {
	const feedContent = props.comments.map(comment => (
		<CommentItem key={comment._id} comment={comment} />
	));

	return <div className="comments">{feedContent}</div>;
};

CommentFeed.propTypes = {
	comments: PropTypes.array.isRequired,
};

export default CommentFeed;
