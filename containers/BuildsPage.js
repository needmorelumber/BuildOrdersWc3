import React, { Component } from 'react';
import VisibleBuilds from './VisibleBuilds'
import CurrentBuild from './CurrentBuild'




class BuildsPage extends Component {
    render() {
        const currStyle = {
            marginTop: '7%'
        };
        return (
            <div className="columns">
                <div className="column is-7">
                    <VisibleBuilds/>
                </div>
                <div className="column" style={currStyle}>
                    <CurrentBuild/>
                </div>
            </div>
        );
    }
}

export default BuildsPage;