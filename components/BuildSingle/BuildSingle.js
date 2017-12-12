import React, { Component } from 'react';
import Timeline from './../Timeline/Timeline'

class BuildSingle extends Component {
    
    componentWillMount() {
       if(this.props.currentVisibleBuild) {
           if(!this.props.currentVisibleBuild.item.build.build_list){
               this.props.fetchById(this.getIdFromPathname());
           }
       } 
    }
    getIdFromPathname(){
        const pathName = this.props.location.pathname;
        const length = pathName.length;
        let idString = '';
        for(let i=length - 1; i>=0; i--) {
            if(pathName[i] === '/') {
                break;
            }
            idString += pathName[i];
        }
        return(idString.split("").reverse().join(""));
    }
    render() {
        const isFetching = this.props.currentVisibleBuild.isFetching;
        const build = this.props.currentVisibleBuild.item.build;
        switch(isFetching) {
            case true: 
                return (
                    <div className="section">
                        LOADING...
                    </div>
                );
            case false:
            default:
                return (
                    <div className="columns">
                        <div className="section column">
                            <Timeline build={this.props.currentVisibleBuild.item.build} updateBuild={this.props.updateBuild} toggle/>
                        </div>
                    </div>
                )
        }
       
    }
}

export default BuildSingle;