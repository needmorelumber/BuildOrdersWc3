import React from 'react'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Route, BrowserRouter } from 'react-router-dom'
import App from './App/App'
import BuildsPage from './BuildsPage'

const Root = ({ store }) => (
  <Provider store={store}>
      <App />
  </Provider>
)


export default Root
