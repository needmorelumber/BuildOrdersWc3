import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import BuildsPage from '../BuildsPage';
import Header from '../../components/Header/Header';
import NewBuild from '../../components/NewBuild/NewBuild';
import TimeLineContainer from '../TimeLineContainer';
import NoMatch from '../../components/noMatch';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import UserPage from '../UserPage';
import Home from '../../components/Home/Home';
import InGameHelper from '../InGameHelper';
import EditBuildPage from '../EditBuildPage';
// import Footer from '../../components/Footer/Footer';
import './app.sass';


const App = () => (
  <Fragment>
    <CssBaseline />
    <Header />
    <div className="container">
      <Switch>
        <Redirect from="/" to="/home" exact />
        <Route path="/home" component={Home} exact />
        <Route path="/builds/new" component={NewBuild} />
        <Route path="/builds" component={BuildsPage} exact />
        <Route path="/build/:id" component={TimeLineContainer} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/user/profile" component={UserPage} />
        <Route path="/build/:id/playing" component={InGameHelper} />
        <Route path="/build/:id/edit" component={EditBuildPage} />
        <Route component={NoMatch} />
      </Switch>
    </div>
    {/* <Footer /> */}
  </Fragment>
);

export default App;
