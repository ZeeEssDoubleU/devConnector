const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const commentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	text: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	avatar: {
		type: String,
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
	post: {
		type: Schema.Types.ObjectId,
		ref: "Post",
	},
});

module.exports = Comment = mongoose.model("Comment", commentSchema, "comments");
