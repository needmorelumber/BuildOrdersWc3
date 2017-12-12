import React, { Component } from 'react';
import VisibleBuilds from './VisibleBuilds'
import CurrentBuild from './CurrentBuild'



class BuildsPage extends Component {
    render() {
        return (
            <div className="columns">
                <VisibleBuilds className="column" />
                <CurrentBuild className="column" />
            </div>
        );
    }
}

export default BuildsPage;