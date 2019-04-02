import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// Mui colors
import brown from '@material-ui/core/colors/brown';
import green from '@material-ui/core/colors/green';

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
// import Footer from '../../components/Footer/Footer';
import './app.sass';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: brown,
    type: 'light',
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
        <Redirect from="/" to="/home" exact />
        <Route path="/home" component={Home} exact />
        <Route path="/builds/new" component={NewBuild} />
        <Route path="/builds" component={BuildsPage} exact />
        <Route path="/builds/:id" component={BuildDetail} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/user/profile" component={UserPage} />
        <Route path="/build/:id/playing" component={InGameHelper} />
        <Route path="/build/:id/edit" component={EditBuildPage} />
        <Route component={NoMatch} />
      </Switch>
      {/* <Footer /> */}
    </Fragment>
  </MuiThemeProvider>
);

export default App;
