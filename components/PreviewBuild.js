import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import data from './../MasterData';
import path from 'path';

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
                    <div className="card-header">
                        <div className="card-header-icon">
                            <Link to= { buildsRoute + build._id }>  <img src={iconString} alt="" /> </Link>
                        </div>
                        <Link className="card-header-title" to= { buildsRoute + build._id }> <u>{'Playback' + '  "' + build.name + '"  ' + 'In Game'}</u></Link>
                    </div>
                    <div className="card-content">
                        <ul>
                            <label className="label" htmlFor="Build Name"> Name </label>
                                <li>{build.name}</li>
                            <label className="label" htmlFor="Build type"> Build Type </label>
                                <li>{build.build_type}</li>
                            <label className="label" htmlFor="Build description"> Description </label>
                                <li>{build.description}</li>
                            <label className="label" htmlFor="Build analysis"> Analysis </label>
                                <li>{build.analysis}</li>
                            <label className="label" htmlFor="Vod Link"> VOD </label>
                                <li>{build.vod_link}</li>
                            <label className="label" htmlFor="Build race"> Race </label>
                                <li>{build.race}</li>
                        </ul>
                    </div>
                </div>
            :
                <div className="container">
                 <p className="title">  Check out some builds! </p> 
                 <p className="help">  Click a build to view in detail... </p> 
                </div>
            }
            </div>
        );
    }
}

export default PreviewBuild;