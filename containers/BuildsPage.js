import React, { Component } from 'react';
import VisibleBuilds from './VisibleBuilds'
import CurrentBuild from './CurrentBuild'




class BuildsPage extends Component {
    render() {
        return (
            <div className="columns">
                <div className="column is-7">
                    <VisibleBuilds/>
                </div>
                <div className="column">
                    <CurrentBuild />
                </div>
            </div>
        );
    }
}

export default BuildsPage;