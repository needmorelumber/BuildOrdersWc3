import PropTypes from 'prop-types';
import React from 'react';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
// Functionality
import { Typography } from '@material-ui/core';
import { decorateComponent } from '../../../common/helpers';
import build, { getBuildOrderCall } from '../../ducks/build';
// Elements

// Redux connections
const mapStateToProps = ({ buildOrder }) => ({
  buildOrder,
});

const mapDispatchToProps = {
  getBuildOrder: getBuildOrderCall,
};

// Styles
const styles = theme => ({
  root: {
    minHeight: '100vh',
    height: '100%',
    marginLeft: 30,
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  title: {
    padding: 10,
  },
  subtitle: {
    margin: 10,
  },
});
// Table Cell Styles
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

class BuildDetail extends React.Component {
  componentDidMount() {
    this.props.getBuildOrder(this.getId());
  }

  getId() {
    return this.props.match.params.id;
  }

  render() {
    const { buildOrder, classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper>
          <Typography className={classes.title} variant="h5"> {buildOrder.name} </Typography>
          <Typography className={classes.subtitle}> {buildOrder.matchup} </Typography>
          <Typography className={classes.subtitle}> {buildOrder.patch} </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Description</CustomTableCell>
                <CustomTableCell align="right">Food</CustomTableCell>
                <CustomTableCell align="right">Total Food</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buildOrder.buildSteps && buildOrder.buildSteps.map(step => (
                <TableRow className={classes.row} key={`${step.food}${step.totalFood}`}>
                  <CustomTableCell component="th" scope="row">
                    {step.description}
                  </CustomTableCell>
                  <CustomTableCell align="right">{step.food}</CustomTableCell>
                  <CustomTableCell align="right">{step.totalFood}</CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const decorators = [
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
];

BuildDetail.propTypes = {
  match: PropTypes.object.isRequired,
  getBuildOrder: PropTypes.func.isRequired,
  buildOrder: PropTypes.object,
};

export default decorateComponent(BuildDetail, decorators);
