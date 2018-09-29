import {
   PROFILE_LOADING,
   GET_PROFILE,
   PROFILE_NOT_FOUND,
   CLEAR_CURRENT_PROFILE,
   GET_PROFILES
} from '../actions/types.js';

const initialState = {
   profile: null,
   profiles: null,
   loading: false,
};

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case PROFILE_LOADING:
         return {
            ...state,
            loading: true,
         };
      case GET_PROFILE:
         return {
            ...state,
            profile: action.payload,
            loading: false,
         };
      case PROFILE_NOT_FOUND:
      case CLEAR_CURRENT_PROFILE:
         return {
            ...state,
            profile: null,
         }
      case GET_PROFILES:
      default:
         return state;
   }
};

export default profileReducer;
