import axios from "axios";
import { ADD_POST, GET_ERRORS } from "./types.js";

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
