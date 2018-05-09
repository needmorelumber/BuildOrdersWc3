import React, {Component} from 'react';
import './buildList.sass'
class BuildListControls extends Component {
  render() {
    return (
      <div className="row rows" style={{marginTop:100}}>
        <aside className="row">
          <p className="">
            Filter by Race
          </p>
          <ul className="filter-race-menu">
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

export default BuildListControls;