import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import warcraftApp from './reducers/index';
import configureStore from './store/configureStore';
// TODO: convert to index.js to avoid redundancy
import App from './containers/App/App';

import './index.sass';

const store = configureStore(warcraftApp);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'), // eslint-disable-line no-undef
);
