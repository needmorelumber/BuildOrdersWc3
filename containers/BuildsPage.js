import React, {Component} from 'react';
import {connect} from 'react-redux';
import VisibleBuilds from './VisibleBuilds';
import {Link} from 'react-router-dom';
import CurrentBuild from './CurrentBuild';
import BuildListControls from './../components/BuildList/BuildListControls';
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
    const user = this.props.user.user.user,
          setFilter = this.props.setFilter,
          setSortType = this.props.setSortType
    return (
      <div>
        <nav className="navbar is-white">
          <div className="container">
            <div className="navbar-menu">
              <div className="navbar-start">
                {user
                  ? <Link to="/builds/new">
                      <p
                        className="control button is-success is-rounded is-block is-alt is-large is-hoverable">
                        <span className="icon is-small">
                          <i className="fa fa-plus"></i>
                        </span>
                        <span>
                          New Build
                        </span>
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
                <BuildListControls 
                  setFilter = {setFilter}
                  setSortType = {setSortType}
                />
            </div>
            <div className="column">
              <div className="box content builds-container">
                <VisibleBuilds/>
              </div>
            </div>
          </div>
        </section> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.builds)
  return {user: state.userState, builds: state.builds}
}
const mapDispatchToProps = (state, dispatch) => {
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