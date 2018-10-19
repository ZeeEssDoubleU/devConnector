import isEmpty from "../validation/isEmpty.js";
import { SET_CURRENT_USER, SET_USER_HANDLE } from "../actions/types.js";

// authorize user reducer
const initialState = {
	isAuthenticated: false,
	user: {},
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		case SET_USER_HANDLE:
			const newState = { ...state };
			newState.user.handle = action.payload;
			return newState;
		default:
			return state;
	}
};

export default authReducer;
