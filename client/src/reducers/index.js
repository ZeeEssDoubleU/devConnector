import { combineReducers } from "redux";

import authReducer from "./authReducer.js";
import errorReducer from "./errorReducer.js";
import postReducer from "./postReducer.js";
import profileReducer from "./profileReducer.js";

const rootReducer = combineReducers({
	authState: authReducer,
	errorState: errorReducer,
	profileState: profileReducer,
	postState: postReducer,
});

export default rootReducer;