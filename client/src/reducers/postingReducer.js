import {
	ADD_POST,
	GET_POSTS,
	GET_POST,
	POST_LOADING,
	DELETE_POST,
	UPDATE_LIKE,
	ADD_COMMENT,
	DELETE_COMMENT,
} from "../actions/types.js";

const initialState = {
	posts: [],
	post: {},
	loading: false,
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case POST_LOADING:
			return {
				...state,
				loading: true,
			};
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			};
		case GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false,
			};
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload._id),
			};
		case ADD_COMMENT:
			return {
				...state,
				post: action.payload,
			};
		case DELETE_COMMENT:
			return {
				...state,
				post: action.payload,
				posts: state.posts.filter(post => post._id !== action.payload._id),
			};
		case UPDATE_LIKE:
			return {
				...state,
				post: action.payload,
				posts: state.posts.map(post => {
					if (post._id === action.payload._id) {
						return action.payload;
					} else {
						return post;
					}
				}),
			};
		default:
			return state;
	}
};

export default postReducer;
