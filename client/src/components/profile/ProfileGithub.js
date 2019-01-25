import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

class ProfileGithub extends Component {
   static propTypes = {
      userName: PropTypes.string.isRequired,
   };

	constructor(props) {
		super(props);

		this.state = {
			repos: [],
		};
	}

	async componentDidMount() {
		const { userName } = this.props;
		await axios
			.get(`/api/profile/github/${userName}`)
			.then(res => {
				if (this.refs.myRef) {
					this.setState({
						repos: res.data,
					});
				}
			})
			.catch(err => console.log(err));
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

ProfileGithub = connect(null)(ProfileGithub);

export default ProfileGithub;
