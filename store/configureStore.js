import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import warcraftApp from '../reducers';

const configureStore = () => {
  // Second argument of createStore can be old state loaded from the history etc...
  const store = createStore(warcraftApp, composeWithDevTools(
    applyMiddleware(thunkMiddleware),
    // other store enhancers if any
  ));
  return store;
};


export default configureStore;
