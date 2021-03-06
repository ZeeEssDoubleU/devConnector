import axios from "axios";
import setAuthToken from "../utils/setAuthToken.js";
import jwt_decode from "jwt-decode"; // module that decodeds jwt token
import { GET_ERRORS, SET_CURRENT_USER } from "./types.js";

// register user
export const registerUser = (userData, history) => dispatch => {
	axios
		.post("/api/users/register", userData)
		.then(res => {
			console.log("New User:", res.data);
			history.push("/login");
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// login - get user token
export const loginUser = userData => dispatch => {
	axios
		.post("/api/users/login", userData)
		.then(res => {
			console.log("Login User:", res.data);

			// save token to localStorage
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);

			// set token to 'authorization' header
			setAuthToken(token);
			// decode token to get user data
			const decoded = jwt_decode(token);
			console.log("Login User decoded:", decoded);
			// set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// log user out
export const logoutUser = history => dispatch => {
	// remove token from localStorage
	localStorage.removeItem("jwtToken");
	// remove the 'authorization' header from future requests
	setAuthToken(false);
	// set current user to {}, which sets isAuthenticated to false
	dispatch(setCurrentUser({}));
	// redirect to login page
	history.push("/login");
};
