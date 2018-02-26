import React, {Component} from 'react';
import {connect} from 'react-redux';
import VisibleBuilds from './VisibleBuilds';
import {Link} from 'react-router-dom';
import CurrentBuild from './CurrentBuild';
import {setVisibilityFilter, setSearchQuery, setSortType} from './../actions/build';
import './../components/custom.sass';

class BuildsPageComp extends Component {
  handleChange(event) {
    this
      .props
      .setFilter("SEARCH_BOX");
    this
      .props
      .setSearchQuery(this.input.value)
    event.preventDefault();
  }
  render() {
    const user = this.props.user.user.user;
    return (
      <div>
        <nav className="navbar is-white">
          <div className="container">
            <div className="navbar-menu">
              <div className="navbar-start">
                {user
                                ? <Link
                                    to="/builds/new">
                                    <p className="control button is-success is-rounded is-block is-alt is-large is-hoverable">
                                    <span className="icon is-small">
                                      <i className="fa fa-plus"></i>
                                    </span><span> New Build </span> 
                                    </p>
                                    </Link>
                                : null
                }
              </div>
              <div className="navbar-end">
               <div className="navbar-item">
                  <input
                    className="input"
                    ref={(input) => this.input = input}
                    onChange={() => this.handleChange(event)}
                    type="text"
                    placeholder="Search builds...."/>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section className="container">
          <div className="columns">
            <div className="column is-2 rows">
            
            <div className="row rows">
              <aside className="row menu">
                <p className="menu-label">
                  Filter by Race
                </p>
                <ul className="filter-race-menu menu-list">
                  <li onClick={() => this.props.setFilter("SHOW_ALL")}>
                    <a>All Races</a>
                  </li>
                  <li onClick={() => this.props.setFilter("SHOW_ORC")}>
                    <a>Orc</a>
                  </li>
                  <li onClick={() => this.props.setFilter("SHOW_HUMAN")}>
                    <a>Human</a>
                  </li>
                  <li onClick={() => this.props.setFilter("SHOW_UNDEAD")}>
                    <a>Undead</a>
                  </li>
                  <li onClick={() => this.props.setFilter("SHOW_NIGHTELF")}>
                    <a>Nightelf</a>
                  </li>
                </ul>
              </aside>
              <aside className="row menu">
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
              </aside>
            </div>
            </div>
            <div className="column is-6">
              <div className="box content builds-container">
                <VisibleBuilds/>
              </div>
            </div>
              <aside className="column ">
                <CurrentBuild/>
              </aside>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {user: state.userState, builds: state.builds}
}
const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: filter => {
      dispatch(setVisibilityFilter(filter))
    },
    setSearchQuery: query => {
      dispatch(setSearchQuery(query))
    },
    setSortType: sortType => {
      dispatch(setSortType(sortType))
    }
  }
}
const BuildsPage = connect(mapStateToProps, mapDispatchToProps)(BuildsPageComp)

export default BuildsPage;