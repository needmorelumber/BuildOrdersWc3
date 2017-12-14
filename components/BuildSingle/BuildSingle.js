import React, { Component } from 'react';
import Timeline from './../Timeline/Timeline'

class BuildSingle extends Component {
    
    componentWillMount() {
       this.props.fetchById(this.getIdFromPathname());    
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
        if(this.props.currentVisibleBuild.item.build._id){
            return(
                <div>
                     <Timeline build={this.props.currentVisibleBuild.item.build} updateBuild={this.props.updateBuild} toggleEmpty={this.props.toggleEmpty}/>
                </div>
            )
        } else{
            return(
                <div>Loading....</div>
            )
        }
    }
}

export default BuildSingle;