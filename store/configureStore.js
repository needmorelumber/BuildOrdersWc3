import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension';
import api from './../api'
import warcraftApp from '../reducers'
import DevTools from '../containers/DevTools'
import thunkMiddleware from 'redux-thunk'

const configureStore = preloadedState => {
  // Second argument of createStore can be old state loaded from the history etc... 
    const store = createStore(warcraftApp, composeWithDevTools(
      applyMiddleware(thunkMiddleware),
      // other store enhancers if any
    ));
  return store
}


export default configureStore
