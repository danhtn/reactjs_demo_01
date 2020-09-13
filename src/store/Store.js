import { createStore, combineReducers } from "redux";
// import thunk from 'redux-thunk';
// import socketMiddleware from '../middleware/socket';
import rootReducer from '../reducers/Reducers';
import initialState from '../reducers/initialState';

function createReducer(asyncReducers) {
  return combineReducers({
    rootReducer,
    ...asyncReducers
  })
}

function configureStore(state) {
  // Add a dictionary to keep track of the registered async reducers
  let asyncReducers = {}
  let store = createStore(
    createReducer(),
    state
  );

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(asyncReducers));
  }

  return store;
}

let store = configureStore(initialState);
export default store;
