import { ADD_POST } from "../actions/types.js";

const initialState = {
	posts: [],
	post: {},
	loading: false,
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
			};
		default:
			return state;
	}
};

export default postReducer;
