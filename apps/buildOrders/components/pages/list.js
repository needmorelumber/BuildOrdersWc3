import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// Mui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
// Functionality
import { decorateComponent } from '../../../common/helpers';
import { getBuildOrdersCall } from '../../ducks/builds';
// Elements
import BuildCard from '../buildCardSingle';
import ListControls from '../listControls';
import FeaturedBuild from '../featuredBuild';

// Redux connections
const mapStateToProps = ({ buildOrders }) => ({
  buildOrders,
});

const mapDispatchToProps = {
  getBuildOrders: getBuildOrdersCall,
};

// Styles
const styles = theme => ({
  root: {
    height: '100%',
    minHeight: '100vh',
    padding: 10,
    flexGrow: 1,
  },
  gridItem: {
    height: 200,
  },
  gridContainer: {
    paddingLeft: '20px',
    paddingTop: '20px',
    paddingRight: '20px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '20%',
      paddingRight: '20%',
      paddingTop: '1%',
      height: '40%',
    },
  },
  listControls: {
    paddingLeft: '20px',
    paddingTop: '20px',
    paddingRight: '20px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '20%',
      paddingRight: '20%',
      paddingTop: '1%',
      height: '40%',
    },
  },
  featured: {
    paddingLeft: '20px',
    paddingTop: '20px',
    paddingRight: '20px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '20%',
      paddingRight: '20%',
      paddingTop: '1%',
      height: '40%',
    },
  },
});

class BuildList extends React.Component {
  componentDidMount() {
    this.props.getBuildOrders();
  }

  render() {
    const { buildOrders, classes, getBuildOrders } = this.props;
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="flex-start" spacing={0}>
          <Grid className={classes.featured} container direction="row">
            <Grid item md={12} lg={12} xs={12} s={12}>
              <Typography variant="h5">
                    Featured Build
              </Typography>
              <FeaturedBuild />
            </Grid>
          </Grid>
          <Grid className={classes.listControls} container direction="row">
            <Grid item md={12} lg={12} xs={12} s={12}>
              <ListControls getBuildOrders={getBuildOrders} />
            </Grid>
          </Grid>
          <Divider variant="middle" color="primary" />
          <Grid className={classes.gridContainer} container direction="row" justify="flex-start" spacing={8}>
            {buildOrders && buildOrders.map(build => (
              <Grid md={6} lg={3} xs={12} s={12} key={build._id} className={classes.gridItem} item>
                <BuildCard build={build} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const decorators = [
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
];

BuildList.propTypes = {
  classes: PropTypes.object,
  getBuildOrders: PropTypes.func.isRequired,
  buildOrders: PropTypes.array,
};

export default decorateComponent(BuildList, decorators);
