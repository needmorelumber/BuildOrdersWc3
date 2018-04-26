import React, {Component} from 'react';
import {connect} from 'react-redux';
import VisibleBuilds from './VisibleBuilds';
import {Link} from 'react-router-dom';
import CurrentBuild from './CurrentBuild';
import BuildListControls from './../components/BuildList/BuildListControls';
import {setVisibilityFilter, setSearchQuery, setSortType} from './../actions/build';
import './../components/BuildList/buildList.sass';

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
    const { user } = this.props.user.user,
          setFilter = this.props.setFilter,
          setSortType = this.props.setSortType
    return (
      <div>
        <section className="container-fluid buildsPageContainer">
          <div className="columns">
            <div className="column is-2 rows">
            {  user
                  ? <Link to="/builds/new">
                      <p className=" button is-primary newBuildButton">
                        <span className="icon is-small">
                          <i className="fa fa-plus"></i>
                        </span>
                      </p>
                    </Link>
                  : null
                }
                <BuildListControls 
                  setFilter = {setFilter}
                  setSortType = {setSortType}
                />
                  <input
                      className="input searchBox"
                      ref={(input) => this.input = input}
                      onChange={() => this.handleChange(event)}
                      type="text"
                      placeholder="Search builds...."/>
            </div>
            <div className="column">
                <VisibleBuilds/>
            </div>
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