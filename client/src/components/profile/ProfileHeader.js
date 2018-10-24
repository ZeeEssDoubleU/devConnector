import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileHeader extends Component {
	render() {
		const { profile } = this.props;
		const { website, social } = profile;
		const urls = { website, ...social }; // collect all urls into single object

		// function to check if urls contain http(s) and prepend them if not
		const checkHttp = url => {
			// set match to http://, https://, or ftp:// (^ = at beginning)
			let match = /^((http|https|ftp):\/\/)/;
			// test if url includes match. If not, prepend http(s)
			return !match.test(url) ? "//" + url : url;
		};

		// collect each url key/value from the urls object
		// url[0] = key, url[1] = value (used below)
		Object.entries(urls).forEach(url => {
			// reformat and reassign each url value to its respective key in the urls object
			urls[url[0]] = url[1] === "" ? "" : checkHttp(url[1]);
		});

		// map urls to icons
		const urlIcons = Object.entries(urls) // collect each url key/value
			.filter(url => url[1].length > 0) // filter out all empty values
			.map((url, index) => (
				<a key={index} className="text-white p-2" href={url[1]} target="_blank">
					{url[0] === "website" ? (
						<i className="fas fa-globe fa-2x" />
					) : (
						<i className={`fab fa-${url[0]} fa-2x`} />
					)}
				</a>
			));

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-info text-white mb-3">
						<div className="row">
							<div className="col-4 col-md-3 m-auto">
								<img className="rounded-circle" src={profile.user.avatar} alt="" />
							</div>
						</div>
						<div className="text-center">
							<h1 className="display-4 text-center">{profile.user.name}</h1>
							<p className="lead text-center">
								{profile.status}{" "}
								{profile.company ? <span>at {profile.company}</span> : null}
							</p>
							{profile.location ? <p>{profile.location}</p> : null}
							<p>{urlIcons}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileHeader.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileHeader;
