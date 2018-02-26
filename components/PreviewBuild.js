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
                <Link to= { buildsRoute + build._id }>  
                    <div className="card-header preview-card">
                        <div className="card-header-icon">
                           <img src={iconString} alt="" />
                        </div>
                        <div className="rows">
                            <p className="card-header-title row">{build.name}</p>
                            <p className="card-header-subtitle row">{build.race} vs. {build.opposing_race}</p>
                        </div>
                    </div>
                </Link>
                    <div className="card-content rows cardFields">
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
                            <div className="row">
                                <label className="label" htmlFor="Build analysis"> Analysis </label>
                                    <p>{build.analysis}</p>
                            </div>
                            <div className="row">
                                <label className="label" htmlFor="Vod Link"> VOD </label>
                                <a rel="noopener noreferrer" target="_blank" href={build.vod_link}>{build.vod_link!=='No Vod' ? 'Link to Vod' : null}</a>

                            </div>
                            <div className="row">
                                <label className="label" htmlFor="Build race"> Race </label>
                                    <p>{build.race}</p>
                            </div>
  
                    </div>
                </div>
            :
                <div >
                 <p className="title">  Check out some builds! </p> 
                 <p className="help">  Click a build to view in detail... </p> 
                </div>
            }
            </div>
        );
    }
}

export default PreviewBuild;