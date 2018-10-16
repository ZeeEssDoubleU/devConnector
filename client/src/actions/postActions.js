import axios from "axios";
import {
	ADD_POST,
	GET_ERRORS,
   GET_POSTS,
   GET_POST,
	POST_LOADING,
	DELETE_POST,
	UPDATE_LIKE,
} from "./types.js";

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

// get post
export const getPost = (id) => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/${id}`)
		.then(res => {
			console.log("Post:", res.data);
			dispatch({
				type: GET_POST,
				payload: res.data,
			});
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_POST,
				payload: null,
			});
		});
};

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

// delete post
export const deletePost = id => dispatch => {
	axios
		.delete(`/api/posts/${id}`)
		.then(res => {
			console.log("Post deleted:", res.data);
			dispatch({
				type: DELETE_POST,
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

// add like
export const likePost = id => dispatch => {
	axios
		.post(`/api/posts/${id}/like`)
		.then(res => {
			console.log("Post liked:", res.data);
			dispatch({
				type: UPDATE_LIKE,
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

// remove like
export const unlikePost = id => dispatch => {
	axios
		.post(`/api/posts/${id}/unlike`)
		.then(res => {
			console.log("Post unliked:", res.data);
			dispatch({
				type: UPDATE_LIKE,
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

// set post loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING,
	};
};
