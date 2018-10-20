const express = require("express");
const router = express.Router();
const passport = require("passport");
// load validations
const validatePostInput = require("../../validation/post.js");
// load models
const Comment = require("../../models/Comments.js");
const Post = require("../../models/Posts.js");

/***************** POSTS *****************/
/***************** POSTS *****************/
/***************** POSTS *****************/

// @route - GET /api/posts
// @desc - get all posts
// @access - public
router.get("/", (req, res) => {
	Post.find()
      .sort({ date: -1 })
      // populate posts' users
		.populate("user", ["handle"])
		.then(posts => res.json(posts))
		.catch(err =>
			res.status(404).json({
				postsNotFound: "No posts found.",
			}),
		);
});

// @route - GET /api/posts/:id
// @desc - get post by id
// @access - public
router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
		// populate post user
		.populate("user", "handle")
		.populate({
			// populate comments' users (nested)
			path: "comments",
			populate: { path: "user", select: "handle" },
		})
		.then(post => res.json(post))
		.catch(err =>
			res.status(404).json({
				postNotFound: "No post found with that ID.",
			}),
		);
});

// @route - POST /api/posts
// @desc - create post
// @access - private
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	// check validation
	if (!isValid) {
		// return errors with 400 status
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id,
	});

	newPost.save().then(post =>
		Post.findById(post.id)
			.populate("user", ["handle"])
			.then(post => res.json(post)),
	);
});

// @route - DELETE /api/posts/:id
// @desc - delete post
// @access - private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			// check for post owner
			if (post.user.toString() !== req.user.id) {
				return res.status(401).json({
					notAuthorized: "User not authorized.",
				});
			}

			// delete
			post.remove().then(post => {
				res.json(post);
			});
		})
		.catch(err => res.status(404).json({ postNotFound: "No post found." }));
});

// @route - POST /api/posts/:id/like
// @desc - like post
// @access - private
router.post("/:id/like", passport.authenticate("jwt", { session: false }), (req, res) => {
	Post.findById(req.params.id).then(post => {
		// see if user has liked post.  Checks equality in filter function.  If no result is filtered (.length = 0), then user has NOT liked post
		if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
			return res.status(400).json({
				alreadyLiked: "User already liked this post.",
			});
		}

		// add user id to likes array
		post.likes.unshift({ user: req.user.id });
		// save and return post
		post.save().then(post => res.json(post));
	});
});

// @route - POST /api/posts/:id/unlike
// @desc - unlike post
// @access - private
router.post("/:id/unlike", passport.authenticate("jwt", { session: false }), (req, res) => {
	Post.findById(req.params.id).then(post => {
		// see if user has liked post.  Checks equality in filter function.  If no result is filtered (length = 0), then user has NOT liked post
		if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
			return res.status(400).json({
				alreadyLiked: "User hasn't liked this post yet.",
			});
		}

		// get remove index
		const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
		// splice  out of array
		post.likes.splice(removeIndex, 1);
		// save and return post
		post.save().then(post => res.json(post));
	});
});

/***************** COMMENTS *****************/
/***************** COMMENTS *****************/
/***************** COMMENTS *****************/

// @route - POST /api/posts/:id/comments
// @desc - add comment to post
// @access - private
router.post("/:id/comments", passport.authenticate("jwt", { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	// check validation
	if (!isValid) {
		// return errors with 400 status
		return res.status(400).json(errors);
	}

	Post.findById(req.params.id)
		.then(post => {
			const newComment = new Comment({
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id,
			});

			// save new comment
			newComment.save().then(comment => {
				// push comment into post comments array
				post.comments.unshift(comment);
				// save new post
				post.save().then(post =>
               Post.findById(post.id)
                  // populate post user
						.populate("user", "handle")
						.populate({
							// populate comments' users (nested)
							path: "comments",
							populate: { path: "user", select: "handle" },
						})
						.then(post => res.json(post)),
				);
			});
		})
		.catch(err =>
			res.status(404).json({
				postNotFound: "No post found.",
			}),
		);
});

// @route - DELETE /api/posts/:id/comments/:comment_id
// @desc - remove comment from post
// @access - private
router.delete(
	"/:id/comments/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				// check to see if comment exists.  If no result is filtered (length = 0), comment doesn't exist
				if (
					post.comments.filter(comment => comment._id.toString() === req.params.comment_id)
						.length === 0
				) {
					return res.status(404).json({
						commentNotFound: "Comment not found.",
					});
				}

				// get remove index
				const removeIndex = post.comments
					.map(comment => comment._id.toString())
					.indexOf(req.params.comment_id);
				// splice comment out of array
				post.comments.splice(removeIndex, 1);
				// save post
				post.save().then(post => res.json(post));
			})
			.catch(err =>
				res.status(404).json({
					commentNotFound: "Comment not found.",
				}),
			);
	},
);

// @route - POST /api/posts/:id/comments/:comment_id/like
// @desc - like comment
// @access - private
router.post(
	"/:id/comments/:comment_id/like",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				// check comment array to see if incoming comment_id matches existing comment._id
				const commentMatch = post.comments.filter(
					comment => comment._id.toString() === req.params.comment_id,
				)[0];
				// check comment's like array to see if incoming like's user.id matches existing like's user (also an id)
				const likeMatch = commentMatch.likes.filter(
					like => like.user.toString() === req.user.id,
				);

				// if like match exists, user has already liked comment, then return json msg
				if (likeMatch.length > 0) {
					return res.status(400).json({
						alreadyLiked: "User already liked this comment.",
					});
				}

				// add user id to likes array
				commentMatch.likes.unshift({ user: req.user.id });
				// save and return post
				post.save().then(post => res.json(post));
			})
			.catch(err =>
				res.status(404).json({
					commentNotFound: "Comment not found.",
				}),
			);
	},
);

// @route - POST /api/posts/:id/comments/:comment_id/unlike
// @desc - unlike comment
// @access - private
router.post(
	"/:id/comments/:comment_id/unlike",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				// check comment array to see if incoming comment_id matches existing comment._id
				const commentMatch = post.comments.filter(
					comment => comment._id.toString() === req.params.comment_id,
				)[0];
				// check comment's like array to see if incoming like's user.id matches existing like's user (also an id)
				const likeMatch = commentMatch.likes.filter(
					like => like.user.toString() === req.user.id,
				);

				// if like match doesn't exists, user hasn't liked comment, then return json msg
				if (likeMatch.length === 0) {
					return res.status(400).json({
						alreadyLiked: "User hasn't liked this comment yet.",
					});
				}

				// get remove index
				const removeIndex = commentMatch.likes
					.map(like => like.user.toString())
					.indexOf(req.user.id);
				// splice out of array
				commentMatch.likes.splice(removeIndex, 1);
				// save and return post
				post.save().then(post => res.json(post));
			})
			.catch(err =>
				res.status(404).json({
					commentNotFound: "Comment not found.",
				}),
			);
	},
);

module.exports = router;
