import React, { Component, Fragment } from 'react';
import './buildList.sass';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core';

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
    const { classes, setFilter } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Tabs value={value} indicatorColor="primary" onChange={(event, changedValue) => this.handleChange(event, changedValue)}>
            <Tab onClick={() => setFilter('SHOW_ALL')} label="Show All" />
            <Tab onClick={() => setFilter('SHOW_ORC')} label="Orc" />
            <Tab onClick={() => setFilter('SHOW_HUMAN')} label="Human" />
            <Tab onClick={() => setFilter('SHOW_UNDEAD')} label="Undead" />
            <Tab onClick={() => setFilter('SHOW_NIGHTELF')} label="Night Elf" />
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
