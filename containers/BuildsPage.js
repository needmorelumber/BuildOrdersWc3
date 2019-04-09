import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
// MUI
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
// Inline css
import '../components/BuildList/buildList.sass';
import { setVisibilityFilter, setSearchQuery, setSortType } from '../actions/build';
import BuildListControls from '../components/BuildList/BuildListControls';

import BuildList from '../apps/buildOrders/components/pages/list';


const styles = theme => ({
  fixedButton: {
    position: 'fixed',
    left: '90%',
    bottom: '10%',
  },
  searchInput: {
    margin: 10,
    width: '90%',
  },
});


class BuildsPageComp extends Component {
  handleChange(event) {
    this
      .props
      .setFilter('SEARCH_BOX');
    this
      .props
      .setSearchQuery(event.target.value);
    event.preventDefault();
  }

  render() {
    const { user } = this.props.user.user;
    const { setFilter, classes } = this.props;
    const { setSortType } = this.props;
    return (
      <div>
        <section className="">
          <ReactTooltip place="right" effect="solid" />
          { user
            ? (
              <Fab size="large" className={classes.fixedButton} color="primary" to="/builds/create" component={Link}>
                <AddIcon data-tip="New Build" />
              </Fab>
            )
            : null
          }
          {/* <input
                className="input searchBox"
                ref={input => this.input = input}
                onChange={() => this.handleChange(event)}
                type="text"
                placeholder="Search builds...."
              /> */}
          <BuildList />

        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userState, builds: state.builds });
const mapDispatchToProps = dispatch => ({
  setFilter: filter => {
    dispatch(setVisibilityFilter(filter));
  },
  setSearchQuery: query => {
    dispatch(setSearchQuery(query));
  },
  setSortType: sortType => {
    dispatch(setSortType(sortType));
  },
});
const BuildsPage = connect(mapStateToProps, mapDispatchToProps)(BuildsPageComp);

export default withStyles(styles)(BuildsPage);
