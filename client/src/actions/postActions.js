import axios from "axios";
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST } from "./types.js";

// add post
export const addPost = postData => dispatch => {
	axios
		.post("/api/posts", postData)
		.then(res => {
			console.log("Post added:", res.data);
			dispatch({
				type: ADD_POST,
				payload: res.data,
			});
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// get posts
export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios
		.get("/api/posts")
		.then(res => {
			console.log("Posts:", res.data);
			dispatch({
				type: GET_POSTS,
				payload: res.data,
			});
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_POSTS,
				payload: null,
			});
		});
};

// delete post
export const deletePost = id => dispatch => {
	axios
		.delete(`/api/posts/${id}`)
		.then(res => {
			console.log("Post deleted:", res.data);
			dispatch({
				type: DELETE_POST,
				payload: id,
			});
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// set post loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING,
	};
};
