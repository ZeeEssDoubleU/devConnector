import axios from "axios";
import {
	GET_PROFILE,
	LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER,
	GET_PROFILES,
} from "./types.js";

// create profile
export const createProfile = (profileData, history) => dispatch => {
	axios
		.post("/api/profile", profileData)
		.then(res => {
			console.log("Profile created:", res.data);
			history.push("/dashboard");
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setLoading());
	axios
		.get("/api/profile")
		.then(res => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_PROFILE,
				payload: {},
			});
		});
};

// get profile by handle
export const getProfileByHandle = handle => dispatch => {
	dispatch(setLoading());
	axios
		.get(`/api/profile/handle/${handle}`)
		.then(res => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_PROFILE,
				payload: null,
			});
		});
};

// get all profiles
export const getProfiles = () => dispatch => {
	dispatch(setLoading());
	axios
		.get("/api/profile/all")
		.then(res => {
			dispatch({
				type: GET_PROFILES,
				payload: res.data,
			});
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_PROFILES,
				payload: null,
			});
		});
};

// add experience
export const addExperience = (expData, history) => dispatch => {
	axios
		.post("/api/profile/experience", expData)
		.then(res => {
			console.log("Experience added:", res.data);
			history.push("/dashboard");
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// add education
export const addEducation = (eduData, history) => dispatch => {
	axios
		.post("/api/profile/education", eduData)
		.then(res => {
			console.log("Education added:", res.data);
			history.push("/dashboard");
		})
		.catch(err => {
			console.log("Errors:", err.response.data);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// delete experience
export const deleteExperience = id => dispatch => {
	axios
		.delete(`/api/profile/experience/${id}`)
		.then(res => {
			console.log("Experience deleted:", res.data);
			dispatch({
				type: GET_PROFILE,
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

// delete education
export const deleteEducation = id => dispatch => {
	axios
		.delete(`/api/profile/education/${id}`)
		.then(res => {
			console.log("Education deleted:", res.data);
			dispatch({
				type: GET_PROFILE,
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

// delete account and profile
export const deleteAccount = () => dispatch => {
	if (window.confirm("Are you sure?  This can NOT be undone!")) {
		axios
			.delete("/api/profile")
			.then(res => {
				console.log("Account deleted :(", res.data);
				dispatch({
					type: SET_CURRENT_USER,
					payload: {},
				});
			})
			.catch(err => {
				console.log("Errors:", err.response.data);
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				});
			});
	}
};

// shows spinner when profile is loading
export const setLoading = () => {
	return {
		type: LOADING,
	};
};

// clear current profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE,
	};
};
