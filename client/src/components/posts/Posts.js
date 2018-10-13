import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import components
import PostForm from "./PostForm.js";
import Spinner from "../common/Spinner.js";

class Posts extends Component {
	render() {
		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {};

export default Posts;
