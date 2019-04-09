import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// Mui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// Functionality
import { decorateComponent } from '../../../common/helpers';
import { getBuildOrdersCall } from '../../ducks/builds';
// Elements
import BuildCard from '../buildCardSingle';
import ListControls from '../listControls';

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
    margin: 10,
    minHeight: '90vh',
    flexGrow: 1,
  },
});

class BuildList extends React.Component {
  componentDidMount() {
    this.props.getBuildOrders();
  }

  render() {
    const { buildOrders, classes, getBuildOrders } = this.props;
    return (
      <Fragment>
        <ListControls getBuildOrders={getBuildOrders} />
        <Grid container direction="row" className={classes.root} spacing={8}>
          {buildOrders && buildOrders.map(build => (
            <Grid md={6} lg={3} xs={12} s={12} key={build._id} item>
              <BuildCard build={build} />
            </Grid>
          ))}
        </Grid>
      </Fragment>
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
