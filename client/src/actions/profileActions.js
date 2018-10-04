import axios from 'axios';
import {
   GET_CURRENT_PROFILE,
   PROFILE_LOADING,
   CLEAR_CURRENT_PROFILE,
   GET_ERRORS,
} from './types.js';

// get current profile
export const getCurrentProfile = () => (dispatch) => {
   dispatch(
      setProfileLoading()
   );
   axios.get('api/profile')
      .then(res => {
         dispatch({
            type: GET_CURRENT_PROFILE,
            payload: res.data,
         });
      })
      .catch(err => {
         console.log('Errors:', err.response.data);
         dispatch({
            type: GET_CURRENT_PROFILE,
            payload: {},
         });
      });
};

// create profile
export const createProfile = (profileData, history) => (dispatch) => {
   axios.post('/api/profile', profileData)
      .then(res => history.push('/dashboard'))
      .catch(err => {
         console.log('Errors:', err.response.data);
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         });
      });
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
