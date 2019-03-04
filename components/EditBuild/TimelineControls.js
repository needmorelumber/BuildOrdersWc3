import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './editbuild.sass';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTooltip from 'react-tooltip';
import { toggleEmpty, restoreBuild, updateBuildById, deleteBuild } from '../../actions/build.js';

class ControlsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalToggle: false,
      currentlyDeleting: null,
    };
  }

  render() {
    const { build } = this.props.currentVisibleBuild.item;
    const { isToggled } = this.props;
    return (
      <div className="buttons">
        <ReactTooltip place="right" effect="solid" />
        <nav className=" buttons">
          <div className="field buttons is-grouped">
            {isToggled
              ? (
                <p className="control">
                  <a
                    className="is-success is-block button is-outlined is-hovered is-small "
                    onClick={() => {
                      this
                        .props
                        .restoreBuild();
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fa fa-eye" />
                    </span>
                    <span>Restore Timeline</span>
                  </a>
                </p>
              )
              : (
                <div className="field buttons is-grouped">
                  <p className="control" data-tip="Helps you in game!">
                    <Link
                      className="button timelinebutton is-info is-block button is-outlined is-hovered is-small "
                      title="Helps you in game!"
                      to={`/build/${build._id}/playing`}
                    >
                      <span className="icon is-small">
                        <i className="fa fa-play" />
                      </span>
                      <span>In game walkthrough</span>
                    </Link>
                  </p>
                  <p className="control">
                    <a
                      className="button is-info is-block button is-outlined is-hovered is-small "
                      onClick={() => {
                        this
                          .props
                          .toggleEmpty();
                      }}
                      data-tip="Hide all seconds without an order"
                    >
                      <span className="icon is-small">
                        <i className="fa fa-cut" />
                      </span>
                      <span>Toggle Empty Seconds</span>
                    </a>
                  </p>
                  <p className="control">
                    <a
                      onClick={() => {
                        this
                          .props
                          .addMinute(build, build._id);
                      }}
                      data-tip="Add 60 seconds to total time"
                      className="is-success is-block button is-small is-hovered is-outlined"
                    >
                      <span className="icon is-small">
                        <i className="fa fa-plus-circle" />
                      </span>
                      <span>Add Minute</span>
                    </a>
                  </p>
                  <p className="control">
                    <a
                      onClick={() => {
                        this
                          .props
                          .removeMinute(build, build._id);
                      }}
                      data-tip="Remove 60 seconds from total time (will delete all orders in this time)"
                      className="is-warning is-block button is-small is-hovered is-outlined"
                    >
                      <span className="icon is-small">
                        <i className="fa fa-minus-circle" />
                      </span>
                      <span>Remove Minute
                      </span>
                    </a>
                  </p>


                  <p className="control">
                    <a
                      onClick={() => {
                        this.toggleDelete(build.name, true);
                      }}
                      data-tip="Delete build forever"
                      className=" is-danger is-block button is-small is-hovered is-outlined"
                    >
                      <span className="icon is-small">
                        <i className="fa fa-trash" />
                      </span>
                      <span>Delete Build</span>
                    </a>
                  </p>
                </div>
              )
            }
            <div />
          </div>
        </nav>
        {this.state.deleteModalToggle
          ? (
            <aside>
              <div className="modal is-active">
                <div
                  className="modal-background"
                  onClick={() => {
                    this.toggleDelete(null, false);
                  }}
                />
                <div className="modal-card">
                  <div className="modal-card-head">
                    Are you sure?
                  </div>
                  <section className="modal-card-body field is-grouped">
                    <button
                      onClick={() => {
                        this.toggleDelete(null, false);
                      }}
                      className="deleteButton is-success is-block button is-large is-hovered is-outlined"
                    >
                      No, take me back to safety
                    </button>
                    <Link to="/builds">
                      <button
                        onClick={() => {
                          this
                            .props
                            .deleteBuild(build._id);
                        }}
                        className="deleteButton is-danger is-block button is-small is-hovered is-outlined"
                      >
                        Yes, delete {this.state.currentlyDeleting}
                        forever
                      </button>
                    </Link>
                  </section>
                </div>
                <button
                  onClick={() => {
                    this.toggleDelete(null, false);
                  }}
                  aria-label="close"
                  className="modal-close is-large"
                />
              </div>
            </aside>
          )
          : null
}
      </div>
    );
  }

  toggleDelete(build, bool) {
    this.setState({ deleteModalToggle: bool, currentlyDeleting: build });
  }
}

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = dispatch => ({
  updateBuild: (build, id) => {
    dispatch(updateBuildById(build, id));
  },
  deleteBuild: id => {
    dispatch(deleteBuild(id));
  },
});

const TimelineControls = connect(mapStateToProps, mapDispatchToProps)(ControlsPanel);

export default TimelineControls;
