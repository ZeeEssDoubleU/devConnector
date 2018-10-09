import axios from "axios";
import {
	GET_CURRENT_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER,
} from "./types.js";

// create profile
export const createProfile = (profileData, history) => (dispatch) => {
	axios
		.post("/api/profile", profileData)
		.then((res) => {
			console.log("Profile created:", res.data);
			history.push("/dashboard");
		})
		.catch((err) => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// get current profile
export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get("api/profile")
		.then((res) => {
			dispatch({
				type: GET_CURRENT_PROFILE,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_CURRENT_PROFILE,
				payload: {},
			});
		});
};

// add experience
export const addExperience = (expData, history) => (dispatch) => {
	axios
		.post("/api/profile/experience", expData)
		.then((res) => {
			console.log("Experience added:", res.data);
			history.push("/dashboard");
		})
		.catch((err) => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// add education
export const addEducation = (eduData, history) => (dispatch) => {
	axios
		.post("/api/profile/education", eduData)
		.then((res) => {
			console.log("Education added:", res.data);
			history.push("/dashboard");
		})
		.catch((err) => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// delete account and profile
export const deleteAccount = () => (dispatch) => {
	if (window.confirm("Are you sure?  This can NOT be undone!")) {
		axios
			.delete("/api/profile")
			.then((res) => {
				console.log("Account deleted :(", res.data);
				dispatch({
					type: SET_CURRENT_USER,
					payload: {},
				});
			})
			.catch((err) => {
				console.log("Errors:", err.response.data);
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				});
			});
	}
};

// shows spinner when profile is loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	};
};

// clear current profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE,
	};
};
