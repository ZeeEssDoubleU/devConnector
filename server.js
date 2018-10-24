const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users.js");
const profile = require("./routes/api/profiles.js");
const posts = require("./routes/api/posts.js");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db config
const db = require("./config/keys").mongoURI;

// connect to MongoDB
mongoose
	.connect(
		db,
		{ useNewUrlParser: true },
	)
	.then(() => console.log("MongoDB connected!"))
	.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport.js")(passport);

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
   // set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build,", "index.html"));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});
