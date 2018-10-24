import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import api calls
import { getGithub } from "../../utils/apiCalls.js";

class ProfileGithub extends Component {
	constructor(props) {
		super(props);

		this.state = {
			repos: [],
		};
	}

	async componentDidMount() {
		const { userName } = this.props;
		const data = await getGithub(userName);
		if (this.refs.myRef) {
			this.setState({
				repos: data,
			});
		}
	}

	render() {
		const { repos } = this.state;

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
						<span className="badge badge-info mr-1">Stars: {repo.stargazers_count}</span>
						<span className="badge badge-secondary mr-1">Watchers: {repo.watcher_count}</span>
						<span className="badge badge-success">Forks: {repo.forks_count}</span>
					</div>
				</div>
			</div>
		));

		return (
			<div ref="myRef">
				<hr />
				<h3 className="mb-4">Latest Github Repos</h3>
				{repoItems}
			</div>
		);
	}
}

ProfileGithub.propTypes = {
	userName: PropTypes.string.isRequired,
};

ProfileGithub = connect(
	null,
	{ getGithub },
)(ProfileGithub);

export default ProfileGithub;
