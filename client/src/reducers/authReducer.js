// authorize user reducer
const initialState = {
   isAuthenticated: false,
   user: {},
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'TEST_DISPATCH':
         return {
            ...state,
            user: action.payload,
         };
      default:
         return state;
   }
};

export default authReducer;
