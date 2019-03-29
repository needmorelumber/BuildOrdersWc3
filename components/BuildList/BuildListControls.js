import React, { Component, Fragment } from 'react';
import './buildList.sass';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabTitle: {
    fontSize: '1em',
    fontFamily: '"Press Start 2P"',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.6em',
    },
  },
});

class BuildListControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Tabs value={value} indicatorColor="primary" onChange={(event, value) => this.handleChange(event, value)}>
            <Tab onClick={() => this.props.setFilter('SHOW_ALL')} label={<Typography className={classes.tabTitle} color="inherit" noWrap> Show All </Typography>} />
            <Tab onClick={() => this.props.setFilter('SHOW_ORC')} label={<Typography className={classes.tabTitle} color="inherit" noWrap> Orc</Typography>} />
            <Tab onClick={() => this.props.setFilter('SHOW_HUMAN')} label={<Typography className={classes.tabTitle} color="inherit" noWrap> Human </Typography>} />
            <Tab onClick={() => this.props.setFilter('SHOW_UNDEAD')} label={<Typography className={classes.tabTitle} color="inherit" noWrap> Undead </Typography>} />
            <Tab onClick={() => this.props.setFilter('SHOW_NIGHTELF')} label={<Typography className={classes.tabTitle} color="inherit" noWrap> Night Elf </Typography>} />
          </Tabs>
        </AppBar>
        {/* <aside className="row menu">
          <p className="menu-label">
            Sort By
          </p>
          <ul className="filter-race-menu menu-list">
            <li onClick={() => this.props.setSortType("POPULARITY")}>
              <a>Popularity</a>
            </li>
            <li onClick={() => this.props.setSortType("CREATED_ON")}>
              <a>Date Created</a>
            </li>
          </ul>
        </aside> */}
      </div>
    );
  }
}

export default withStyles(styles)(BuildListControls);
