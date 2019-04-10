import React, { Component } from 'react';
import PropTypes from 'prop-types';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

import { FEATHERS_DESCENDING } from '../../common/constants';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabTitle: {
    fontSize: '1em',
    fontFamily: '"Press Start 2P"',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.4em',
    },
  },
});

const searchFields = [
  'name',
  'race',
  'opposingRace',
  'description',
  'ownerUsername',
];

class BuildListControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: 'createdAt',
      filterRace: undefined,
      searchTerms: '',
      value: 0,
    };
  }

  setSortType(sortType, callback) {
    return this.setState({ sortType }, callback);
  }

  setFilter(filterRace, callback) {
    return this.setState({ filterRace }, callback);
  }

  setSearchTerm(searchTerms, callback) {
    return this.setState({ searchTerms }, callback);
  }

  getBuilds() {
    const { searchTerms } = this.state;

    // this uses feathers-mongodb-fuzzy-search to ask:
    // "Find me any entity where one of the fields in searchFields fuzzy-matches the search term"
    const search = searchTerms
      ? {
        $or: searchFields.map(field => ({ [field]: { $search: searchTerms } })),
      }
      : {};

    return this.props.getBuildOrders({
      query: {
        race: this.state.filterRace,
        $sort: {
          [this.state.sortType]: FEATHERS_DESCENDING,
        },
        ...search,
      },
    });
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    const onTabClick = race => () => {
      this.setFilter(race, this.getBuilds);
    };

    const onSearch = e => {
      this.setSearchTerm(e.target.value, this.getBuilds);
    };

    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Tabs value={value} indicatorColor="primary" onChange={(event, changedValue) => this.handleChange(event, changedValue)}>
            <Tab onClick={onTabClick()} className={classes.tabTitle} label="Show All" />
            <Tab onClick={onTabClick('OR')} className={classes.tabTitle} label="Orc" />
            <Tab onClick={onTabClick('HU')} className={classes.tabTitle} label="Human" />
            <Tab onClick={onTabClick('UD')} className={classes.tabTitle} label="Undead" />
            <Tab onClick={onTabClick('NE')} className={classes.tabTitle} label="Night Elf" />
          </Tabs>
        </AppBar>
        <Toolbar>
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
            onChange={onSearch}
          />
        </Toolbar>
        {/* <aside className="row menu">
          <p className="menu-label">
            Sort By
          </p>
          <ul className="filter-race-menu menu-list">
            <li onClick={() => this.props.setSortType("POPULARITY")}>
              <a>Popularity</a>
            </li>
            <li onClick={() => this.props.setSortType("createdAt")}>
              <a>Date Created</a>
            </li>
          </ul>
        </aside> */}
      </div>
    );
  }
}

BuildListControls.propTypes = {
  classes: PropTypes.object.isRequired,
  getBuildOrders: PropTypes.func.isRequired,
};

export default withStyles(styles)(BuildListControls);
