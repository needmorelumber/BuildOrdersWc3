import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import {
  toggleEmpty,
  restoreBuild,
  updateBuildById,
  deleteBuild
} from './../../actions/build.js'
import './editbuild.sass';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 



class ControlsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteModalToggle: false,
      currentlyDeleting: null
    }
  }
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
              <p className="control">
                <a className="is-success is-block button is-outlined is-hovered is-small " onClick={()=>{this.props.restoreBuild()}}> Restore Timeline </a>
              </p>
              :
              <div className="field-is-grouped">
                <p className="control">
                  <a className="is-success is-block button is-outlined is-hovered is-small " onClick={()=>{this.props.toggleEmpty()}}> Toggle Empty Seconds</a>
                </p>
                <p className="control">
                  <a onClick={()=>{this.props.addMinute(build, build._id)}}className="is-success is-block button is-small is-hovered is-outlined"> Add Minute </a>
                </p>
                <p className="control">
                  <a onClick={()=>{this.props.removeMinute(build, build._id)}}className="is-success is-block button is-small is-hovered is-outlined"> Remove Minute </a>
                </p>
              </div>
            }
            <div className="field-is-grouped">
              <p className="control">
                <Link className="is-success is-block button is-outlined is-hovered is-small " to={'/build/' + build._id + '/playing'}>In game walkthrough</Link>
              </p>
              <p className="control">
                <a onClick={()=>{this.toggleDelete(build.name, true)}}className="is-danger is-block button is-small is-hovered is-outlined"> Delete Build </a>            
              </p>
            </div>
            </div> 
          </nav>
          { this.state.deleteModalToggle
          ?
          <aside>
            <div className="modal is-active">
            <div className="modal-background" onClick={()=>{this.toggleDelete(null, false)}}></div>
            <div className="modal-card">
            <div className="modal-card-head"> Are you sure? </div>
            <section className="modal-card-body">
              <button onClick={()=>{this.toggleDelete(null, false)}}className="is-success is-block button is-small is-hovered is-outlined"> No, take me back to safety</button>   
              <button onClick={()=>{this.props.deleteBuild(build._id)}}className="is-danger is-block button is-small is-hovered is-outlined"> <Link to="/builds">Yes, delete {this.state.currentlyDeleting} forever </Link></button>   
            </section>
            </div>
            <button onClick={()=>{this.toggleDelete(null, false)}}className="modal-close is-large" aria-label="close"></button>
          </div>
          </aside>
          : null
          }
      </div>
    );
  }
  toggleDelete(build, bool) {
    this.setState({
      deleteModalToggle: bool,
      currentlyDeleting: build
    })
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
      }, 
      deleteBuild: (id) => {
        dispatch(deleteBuild(id))
      }
  }
}

const TimelineControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsPanel)

export default TimelineControls