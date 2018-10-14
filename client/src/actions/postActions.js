import axios from "axios";
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING } from "./types.js";

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

// add posts
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

// set loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING,
	};
};
