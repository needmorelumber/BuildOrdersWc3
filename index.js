import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import './index.sass';
import Root from './containers/Root';
import warcraftApp from './reducers/index';
import configureStore from './store/configureStore';

const store = configureStore(warcraftApp);
ReactDOM.render(
  <BrowserRouter>
    <Root className="main" store={store} />
  </BrowserRouter>,
  document.getElementById('root'),
);
