import {
	ADD_POST,
	GET_POSTS,
	GET_POST,
	POST_LOADING,
	DELETE_POST,
	LIKE_UNLIKE_POST,
	GET_COMMENTS,
	ADD_COMMENT,
	DELETE_COMMENT,
	LIKE_UNLIKE_COMMENT,
} from "../actions/types.js";

const initialState = {
	posts: [],
	post: {},
	comments: [],
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
		case LIKE_UNLIKE_POST:
			return {
				...state,
				post: state.post._id === action.payload._id ? action.payload : state.post,
				posts: state.posts.map(
					post => (post._id === action.payload._id ? action.payload : post),
				),
			};
		case GET_COMMENTS:
			return {
				...state,
				comments: action.payload,
			};
		case ADD_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: [action.payload.id, ...state.comments],
				},
				comments: [action.payload, ...state.comments],
			};
		case DELETE_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: state.post.comments.filter(id => id !== action.payload._id),
				},
				comments: state.comments.filter(comment => comment._id !== action.payload._id),
			};
		case LIKE_UNLIKE_COMMENT:
			return {
				...state,
				comments: state.comments.map(
					comment => (comment._id === action.payload._id ? action.payload : comment),
				),
			};
		default:
			return state;
	}
};

export default postReducer;
