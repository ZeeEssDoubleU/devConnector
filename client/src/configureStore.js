import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = () => {
   const initialState = {};
   const middleware = [thunk];
   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

   // create store
   const store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(
         applyMiddleware(...middleware)
      )
   );

   return store;
}

export default configureStore;
