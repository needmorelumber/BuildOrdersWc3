import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import path from 'path';
import './previewBuild.sass';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import data from '../../MasterData';

class PreviewBuild extends Component {
  render() {
    let build;
    if (!this.props.currentVisibleBuild.item.build) {
      build = false;
    } else {
      build = this.props.currentVisibleBuild.item.build;
      var buildsRoute = '/build/';
      const { race } = build;
      const iconString = `https://s3.us-west-2.amazonaws.com/needmorelumberassets/icons/${race}.jpg`;
    }
    return (
      <div className="section">
        { build._id
          ? (
            <CSSTransition
              classNames="fade"
              timeout={900}
            >
              <div className="card">
                <div className="card-content rows cardFields">
                  <Link to={buildsRoute + build._id}>
                    <div className="card-header preview-card">
                      <p className="card-header-title"> {build.name} Walkthrough</p>
                      <div className="card-header-icon">
                            <span className="icon"> <i className="fa fa-eye" /> </span> <span className="icon nextIcon"><i className="fa fa-arrow-circle-right" /></span>
                          </div>
                    </div>
                  </Link>
                  <div className="columns">
                    <div className="column">
                      <div className="row">
                            <label className="label cardLabel" htmlFor="Build Name"> Name </label>
                            <p className="cardInfo">{build.name}</p>
                          </div>
                      <div className="row">
                            <label className="label cardLabel" htmlFor="Build type"> Build Type </label>
                            <p className="cardInfo">{build.build_type}</p>
                          </div>
                      <div className="row">
                            <label className="label cardLabel" htmlFor="Build description"> Description </label>
                            <p className="cardInfo">{build.description}</p>
                          </div>
                    </div>
                    <div className="column">
                      <div className="row">
                            <label className="label cardLabel" htmlFor="Build analysis"> Analysis </label>
                            <p className="cardInfo">{build.analysis}</p>
                          </div>
                      <div className="row">
                            <label className="label cardLabel" htmlFor="Build race"> Match-Up </label>
                            <p className="cardInfo">{build.race} vs. {build.opposing_race}</p>
                          </div>
                      <div className="row">
                            <label className="label cardLabel" htmlFor="Vod Link"> VOD </label>
                            <a rel="noopener noreferrer" target="_blank" href={build.vod_link}>{build.vod_link !== 'No Vod' ? 'Link to Vod' : null}</a>

                          </div>
                    </div>
                  </div>
                </div>
              </div>
            </CSSTransition>
          )
          : null
            }
      </div>
    );
  }
}

export default PreviewBuild;
