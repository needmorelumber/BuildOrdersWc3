import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './app.css';
import api from './../../api';
import BuildsPage from '../BuildsPage';
import HomePage from '../HomePage';
import { normalize, schema } from 'normalizr';
import Header from './../../components/Header/Header';
import NewBuild from './../../components/NewBuild';
import CurrentBuild from './../CurrentBuild';
import TimeLineContainer from './../TimeLineContainer';


const RouteAndSub = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          path: '/',
          component: HomePage
        },
        {
          path: '/new',
          component: NewBuild
        },
        {
          path: '/builds',
          component: BuildsPage,
        },
        {
          path: '/build',
          component: TimeLineContainer,
          routes: [
            {
              path: '/build/:id',
              component: TimeLineContainer
            }
          ]
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.routes.map((route, i) => {
          return (
            <RouteAndSub key={i} {...route}/>
          )
        })}
      </div>
    );
  }

}

export default App;