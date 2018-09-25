import axios from 'axios';

// register user
export const registerUser = (userData, history) => (dispatch) => {
   axios
      .post('/api/users/register', userData)
      .then(res => {
         console.log('New User:', res.data);
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
