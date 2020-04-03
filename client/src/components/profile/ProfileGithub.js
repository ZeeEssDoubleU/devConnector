import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

const ProfileGithub = props => {
	const [repos, setRepos] = useState([]);

	// effect that retrieves github repo on component mount
	useEffect(() => {
		getGithubRepo();
	}, []);

	const getGithubRepo = async () => {
		try {
			const response = await axios.get(
				`/api/profile/github/${props.userName}`,
			);
			setRepos(response.data);
		} catch (err) {
			console.error(err);
		}
	};

	const repoItems = repos.map(repo => (
		<div key={repo.id} className="card card-body mb-2">
			<div className="row">
				<div className="col-md-6">
					<h4>
						<a href={repo.html_url} className="text-info" target="_blank">
							{repo.name}
						</a>
					</h4>
					<p>{repo.description}</p>
				</div>
				<div className="col-md-6">
					<span className="badge badge-info mr-1">
						Stars: {repo.stargazers_count}
					</span>
					<span className="badge badge-secondary mr-1">
						Watchers: {repo.watcher_count}
					</span>
					<span className="badge badge-success">
						Forks: {repo.forks_count}
					</span>
				</div>
			</div>
		</div>
	));

	return (
		<div>
			<hr />
			<h3 className="mb-4">Latest Github Repos</h3>
			{repoItems}
		</div>
	);
};

ProfileGithub.propTypes = {
	userName: PropTypes.string.isRequired,
};

export default connect(null)(ProfileGithub);
