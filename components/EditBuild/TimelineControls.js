import React, { Component } from 'react';
import { connect } from 'react-redux'



class ControlsPanel extends Component {
  render() {
    return (
      <div className="section">
          <nav className="panel">
            <p className="panel-heading">
              Main Controls
            </p>
            <div className="panel-block">
              <button className="is-success is-block button"> Toggle Empty Seconds</button>
            </div>
            <div className="panel-block">
              <button className="is-success is-block button"> Set Time </button>
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

  }
}

const TimelineControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsPanel)

export default TimelineControls