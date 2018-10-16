import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import actions
import { getPost } from "../../actions/postActions.js";
// import components
import PostItem from "../posts/PostItem.js";
import Spinner from "../common/Spinner.js";

class Post extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}

	render() {
		const { post, loading } = this.props.posting;
		let postContent; // initialize variable to populate component below

		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner />;
		} else {
			postContent = (
				<div>
					<PostItem post={post} />
					{/* // Comment Form */}
					<div className="post-form mb-3">
						<div className="card card-info">
							<div className="card-header bg-info text-white">Say Somthing...</div>
							<div className="card-body">
								<form>
									<div className="form-group">
										<textarea
											className="form-control form-control-lg"
											placeholder="Create a post"
										/>
									</div>
									<button type="submit" className="btn btn-dark">
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
					{/* // Comment Feed */}
					<div className="comments">
						{/* // Comment Item */}
						<div className="card card-body mb-3">
							<div className="row">
								<div className="col-md-2">
									<a href="profile.html">
										<img
											className="rounded-circle d-none d-md-block"
											src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
											alt=""
										/>
									</a>
									<br />
									<p className="text-center">Kevin Smith</p>
								</div>
								<div className="col-md-10">
									<p className="lead">
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus
										corporis sunt necessitatibus! Minus nesciunt soluta suscipit nobis.
									</p>
								</div>
							</div>
						</div>
						<div className="card card-body mb-3">
							<div className="row">
								<div className="col-md-2">
									<a href="profile.html">
										<img
											className="rounded-circle d-none d-md-block"
											src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
											alt=""
										/>
									</a>
									<br />
									<p className="text-center">Karen Johnson</p>
								</div>
								<div className="col-md-10">
									<p className="lead">
										{" "}
										Amet accusamus distinctio cupiditate blanditiis dolor? Illo
										perferendis eveniet cum cupiditate aliquam?
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
                     <Link to="/feed" className="btn btn-light">
                        &#8592; Back to Feed
							</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	posting: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	posting: state.posting,
});

Post = connect(
	mapStateToProps,
	{ getPost },
)(Post);

export default Post;
