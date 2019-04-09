import React, { Component, Fragment } from 'react';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
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
    const { classes, getBuildOrders } = this.props;
    const setFilter = race => (
      !race || race === ''
        ? getBuildOrders()
        : getBuildOrders({
          query: {
            race,
          },
        })
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Tabs value={value} indicatorColor="primary" onChange={(event, changedValue) => this.handleChange(event, changedValue)}>
            <Tab onClick={() => setFilter('')} className={classes.tabTitle} label="Show All" />
            <Tab onClick={() => setFilter('OR')} className={classes.tabTitle} label="Orc" />
            <Tab onClick={() => setFilter('HU')} className={classes.tabTitle} label="Human" />
            <Tab onClick={() => setFilter('UD')} className={classes.tabTitle} label="Undead" />
            <Tab onClick={() => setFilter('NE')} className={classes.tabTitle} label="Night Elf" />
          </Tabs>
        </AppBar>
        {/* SEARCH BAR, UNCOMMENT WHEN CONNECTED TO DATA */}
        {/* <Toolbar>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            className={classes.searchInput}
            placeholder="Search builds..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            ref={input => this.input = input}
            onChange={event => this.handleSearchChange(event)}
          />
        </Toolbar> */}
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
