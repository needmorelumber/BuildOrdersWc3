import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  toggleEmpty,
  restoreBuild,
  updateBuildById
} from './../../actions/build.js'



class ControlsPanel extends Component {
  render() {
    const build = this.props.currentVisibleBuild.item.build;
    const isToggled = this.props.isToggled
    return (
      <div className="">
          <nav className="panel">
            <p className="panel-heading">
              Main Controls
            </p>
            <div className="panel-block">
            { isToggled === true
              ?
                <button className="is-success is-block button" onClick={()=>{this.props.restoreBuild()}}> Restore Timeline </button>
              :
                <button className="is-success is-block button" onClick={()=>{this.props.toggleEmpty()}}> Toggle Empty Seconds</button>
            }
            </div>
            <div className="panel-block">
              <button onClick={()=>{this.props.addMinute(build)}}className="is-success is-block button"> Add Minute </button>
            </div>
          </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      updateBuild: (build, id) => {
        dispatch(updateBuildById(build, id))
      }
  }
}

const TimelineControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsPanel)

export default TimelineControls