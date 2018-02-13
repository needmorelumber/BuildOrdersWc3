import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import {
  toggleEmpty,
  restoreBuild,
  updateBuildById
} from './../../actions/build.js'
import './editbuild.sass';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 



class ControlsPanel extends Component {
  render() {
    const build = this.props.currentVisibleBuild.item.build;
    const isToggled = this.props.isToggled
    return (
      <div className="">
          <nav className="panel">
            <p className="panel-heading">
              Timeline Controls
            </p>
            <div className="panel-block">
            { isToggled === true
              ?
                <button className="is-success is-block button is-outlined is-hovered is-small is-fullwidth" onClick={()=>{this.props.restoreBuild()}}> Restore Timeline </button>
              :
                <button className="is-success is-block button is-outlined is-hovered is-small is-fullwidth" onClick={()=>{this.props.toggleEmpty()}}> Toggle Empty Seconds</button>
            }
            </div> 
            { isToggled === true
              ?
              null
              :
              <div className="panel-block">
                <button onClick={()=>{this.props.addMinute(build, build._id)}}className="is-success is-block button is-small is-fullwidth is-hovered is-outlined"> Add Minute </button>
              </div>
            }
            <div className="panel-block">
            <Link className="is-success is-block button is-outlined is-hovered is-small is-fullwidth" to={'/build/' + build._id + '/playing'}>In game walkthrough</Link>
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