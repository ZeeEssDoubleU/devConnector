import axios from 'axios';
import setAuthToken from '../utils/setAuthToken.js';
import jwt_decode from 'jwt-decode'; // module that decodeds jwt token

// register user
export const registerUser = (userData, history) => (dispatch) => {
   axios
      .post('/api/users/register', userData)
      .then(res => {
         console.log('New User action:', res.data);
         history.push('/login');
      })
      .catch(err => {
         console.log('Errors:', err.response.data);
         dispatch({
            type: 'GET_ERRORS',
            payload: err.response.data
         });
      });
};

// login - get user token
export const loginUser = (userData) => (dispatch) => {
   axios
      .post('/api/users/login', userData)
      .then(res => {
         console.log('Login User action', res.data);

         // save token to localStorage
         const { token } = res.data;
         localStorage.setItem('jwtToken', token);

         // set token to 'authorization header
         setAuthToken(token);
         // decode token to get user data
         const decoded = jwt_decode(token);
         console.log('Login User action decoded', decoded);
         // set current user
         dispatch(setCurrentUser(decoded));
      })
      .catch(err => {
         console.log('Errors:', err.response.data);
         dispatch({
            type: 'GET_ERRORS',
            payload: err.response.data
         });
      });
};

// set logged in user
export const setCurrentUser = (decoded) => {
   return {
      type: 'SET_CURRENT_USER',
      payload: decoded,
   };
};
