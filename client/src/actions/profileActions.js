import axios from 'axios';
import {
   GET_PROFILE,
   PROFILE_LOADING,
   CLEAR_CURRENT_PROFILE
} from './types.js';

// get current profile
export const getCurrentProfile = () => (dispatch) => {
   dispatch(
      setProfileLoading()
   );
   axios.get('api/profile')
      .then(res => {
         return {
            type: GET_PROFILE,
            payload: res.data,
         };
      })
      .catch(err => {
         return {
            type: GET_PROFILE,
            payload: {},
         };
      });
};

// shows spinner when profile is loading
export const setProfileLoading = () => {
   return {
      type: PROFILE_LOADING,
   }
};

// clear current profile
export const clearCurrentProfile = () => {
   return {
      type: CLEAR_CURRENT_PROFILE,
      payload: null,
   }
};
