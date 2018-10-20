const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const postSchema = new Schema({
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
	comments: [
		{
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
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Post = mongoose.model("Post", postSchema);
