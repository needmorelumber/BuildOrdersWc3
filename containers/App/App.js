import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch,CSSTransitionGroup } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import BuildsPage from '../BuildsPage';
import { normalize, schema } from 'normalizr';
import Header from './../../components/Header/Header';
import NewBuild from './../../components/NewBuild/NewBuild';
import CurrentBuild from './../CurrentBuild';
import TimeLineContainer from './../TimeLineContainer';
import NoMatch from './../../components/noMatch';
import LoginPage from './../LoginPage';
import RegisterPage from './../RegisterPage';
import UserPage from './../UserPage';
import AddOrder from './../../components/BuildSingle/AddOrder';
import Home from './../../components/Home/Home';
import InGameHelper from './../InGameHelper';
import EditBuildPage from './../EditBuildPage';
import Footer from './../../components/Footer/Footer';
import { NavigationDrawer } from 'react-md';
import './app.sass';


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
          path: '/home',
          exact: true,
          component: Home
        },
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
          exact: true,
          component: TimeLineContainer,
        },
        {
          path: '/login',
          component: LoginPage
        },
        {
          path: '/register',
          component: RegisterPage
        },
        {
          path: '/user/profile',
          component: UserPage
        },
        {
          path: '/build/:id/playing',
          component: InGameHelper
        },
        {
          path: '/build/:id/edit',
          component: EditBuildPage
        },
      ]
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Switch>  
            <Route exact path="/" render={() => (
                <Redirect to="/home"/>
              )}/>
                {this.state.routes.map((route, i) => {
                  return (
                      <RouteAndSub key={i} {...route}/>
                  )
                })}
              <Route component={NoMatch} />
          </Switch>
        </div>
        {/* <Footer /> */}
      </div> 
    );
  }

}

export default App;