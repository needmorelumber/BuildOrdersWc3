import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import data from './../MasterData';
import path from 'path';
import './custom.sass';

class PreviewBuild extends Component {
    render() {
        var build;
        if(!this.props.currentVisibleBuild.item.build){
            build = false
        } else {
            build = this.props.currentVisibleBuild.item.build; 
            var buildsRoute= "/build/";
            var race = build.race;
            var iconString = path.join('/assets/icons/', race + '.jpg')
        }
        return (
            <div className="section">
            { build._id
            ? 
                <div className="card">
                    <div className="card-content rows cardFields">
                        <div className="columns">
                             <div className="column">
                                <div className="row">
                                    <label className="label" htmlFor="Build Name"> Name </label>
                                        <p>{build.name}</p>
                                </div>
                                <div className="row">
                                    <label className="label" htmlFor="Build type"> Build Type </label>
                                        <p>{build.build_type}</p>
                                </div>
                                <div className="row">
                                    <label className="label" htmlFor="Build description"> Description </label>
                                    <p>{build.description}</p>
                                </div>
                            </div>
                        <div className="column">
                            <div className="row">
                                <label className="label" htmlFor="Build analysis"> Analysis </label>
                                    <p>{build.analysis}</p>
                            </div>
                            <div className="row">
                                <label className="label" htmlFor="Vod Link"> VOD </label>
                                <a rel="noopener noreferrer" target="_blank" href={build.vod_link}>{build.vod_link!=='No Vod' ? 'Link to Vod' : null}</a>

                            </div>
                            <div className="row">
                                <label className="label" htmlFor="Build race"> Match-Up </label>
                                    <p>{build.race} vs. {build.opposing_race}</p>
                            </div>
                        </div>
                    </div>
                  <Link to= { buildsRoute + build._id }>  
                    <div className="card-header preview-card">
                            <p className="card-header-title">Look at the orders, and play in real time</p>
                        <div className="card-header-icon">
                          <span className="icon"><i className="fa fa-arrow-circle-right"></i></span>
                        </div>
                    </div>
                </Link>
                    </div>
                </div>
            :
            null
            }
            </div>
        );
    }
}

export default PreviewBuild;