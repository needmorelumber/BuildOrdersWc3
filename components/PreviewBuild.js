import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import data from './../MasterData';
import path from 'path';

class PreviewBuild extends Component {
    
    render() {
        const build = this.props.currentVisibleBuild.item.build;        
        const buildsRoute= "/build/";
        const race = this.props.currentVisibleBuild.item.build.race;
        const imgString = path.join('/assets/icons/', race + '.jpg')
        return (
            <div className="section">
            { race 
            ? 
                <div className="card">
                    <div className="card-header">
                        <div className="card-header-icon">
                            <Link to= { buildsRoute + build._id }>  <img src={imgString} alt="" /> </Link>
                        </div>
                        <Link className="card-header-title" to= { buildsRoute + build._id }> <u>{'Playback' + ' ' + build.name + ' ' + 'In Game'}</u></Link>
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
                        </ul>
                    </div>
                </div>
            :
                <div> Check out some builds! </div>
            }
            </div>
        );
    }
}

export default PreviewBuild;