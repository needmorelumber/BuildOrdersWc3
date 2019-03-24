import React, { Fragment } from 'react';
// TODO: wat
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


import './home.sass';

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
});

const Home = ({ classes }) => (
  <Fragment>
    <main>
      {/* Hero unit */}
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Need More Lumber
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Be your own warcraft 3 commander with orders every second.
            Just create a build, then run it in real time during the game!
            Never miss the next unit to build!
          </Typography>
          <Grid container spacing={16} justify="center">
            <Grid item>
              <Button component={Link} to="/register">
                Create a Build
              </Button>
            </Grid>
            <Grid item>
              <Button component={Link} to="/builds">
                Browse Builds
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </main>
    <div className="hero-foot">
      <div className="container has-text-centered">
        <p className="control">
          <a className="button" href="https://github.com/needmorelumber/BuildOrdersWc3" target="_blank" rel="noopener noreferrer">
            <span className="icon is-small">
              <i className="fa fa-github" />
            </span>
            <span>Check out the project</span>
          </a>
        </p>
      </div>
    </div>
  </Fragment>
);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
