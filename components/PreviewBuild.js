import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PreviewBuild extends Component {
    
    render() {
        const build = this.props.currentVisibleBuild.item.build;        
        const buildsRoute= "/build/"
        return (
            <div className="section">
                <Link to= { buildsRoute + build._id }> Load up {build.name} </Link>
            </div>
        );
    }
}

export default PreviewBuild;