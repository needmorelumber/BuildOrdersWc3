import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import './app.css';
import api from './../../api';
import BuildsPage from '../BuildsPage';
import HomePage from '../HomePage';
import { normalize, schema } from 'normalizr';
import Header from './../../components/Header/Header';
import NewBuild from './../../components/NewBuild';
import CurrentBuild from './../CurrentBuild';
import TimeLineContainer from './../TimeLineContainer';
import NoMatch from './../../components/noMatch';
import LoginPage from './../LoginPage';
import RegisterPage from './../RegisterPage'


const RouteAndSub = (route) => (
  <Route path={route.path} render={props => (
      //nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          path: '/builds/new',
          component: NewBuild
        },
        {
          path: '/builds',
          exact: true,
          component: BuildsPage,
        },
        {
          path: '/build/:id',
          component: TimeLineContainer,
        },
        {
          path: '/login',
          component: LoginPage
        },
        {
          path: '/register',
          component: RegisterPage
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