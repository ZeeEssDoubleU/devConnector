const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// load models
const User = require("../models/Users.js");
// load auth keys
const keys = require("./keys.js");

// see passport-jwt documentation
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then(user => {
					if (user) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				})
				.catch(err => console.log(err));
		}),
	);
};
