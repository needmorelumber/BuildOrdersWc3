import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// Mui colors
import brown from '@material-ui/core/colors/brown';
import green from '@material-ui/core/colors/green';

import BuildsPage from '../BuildsPage';
import Header from '../../components/Header/Header_MUI';
import NewBuild from '../../components/NewBuild/NewBuild';
// import TimeLineContainer from '../TimeLineContainer';
import NoMatch from '../../components/noMatch';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import UserPage from '../UserPage';
import Home from '../../components/Home/Home';
import InGameHelper from '../InGameHelper';
import EditBuildPage from '../EditBuildPage';

import BuildDetail from '../../apps/buildOrders/components/pages/detail';
import BuildList from '../../apps/buildOrders/components/pages/list';
import BuildCreate from '../../apps/buildOrders/components/pages/create';
import BuildUpdate from '../../apps/buildOrders/components/pages/update';
// import Footer from '../../components/Footer/Footer';
import './app.sass';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: brown,
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
    h6: {
      fontSize: '1em',
      fontFamily: '"Press Start 2P"',
    },
    h5: {
      fontFamily: '"Press Start 2P"',
    },
    subheading: {
      fontFamily: '"Press Start 2P"',
    },
    heading: {
      fontFamily: '"Press Start 2P"',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Fragment>
      <CssBaseline />
      <Header />
      <Switch>
        <Redirect from="/" to="/builds-list" exact />
        <Route path="/home" component={Home} exact />

        {/* Old Build routes */}
        <Route path="/builds/new" component={NewBuild} />
        <Route path="/builds" component={BuildsPage} exact />

        {/* New Build routes */}
        <Route path="/builds-list" component={BuildsPage} exact />
        <Route path="/builds/create" component={BuildCreate} exact />
        <Route path="/builds/:id" component={BuildDetail} exact />
        <Route path="/builds/:id/update" component={BuildUpdate} exact />

        {/* auth / user routes */}
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/user/profile" component={UserPage} />
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  </MuiThemeProvider>
);

export default App;
