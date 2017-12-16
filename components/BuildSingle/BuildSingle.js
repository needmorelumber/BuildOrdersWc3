import React, { Component } from 'react';
import Timeline from './../Timeline/Timeline'
import path from 'path';

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
            const race = this.props.currentVisibleBuild.item.build.race;
            const iconString = path.join('/assets/icons/', race + '.jpg')
            return(
                <div>
                     <section className="hero">
                        <div className="hero-body level"> 
                        <div className="level-left">
                            <figure className="image is-128x128 level-item">
                                <img src={iconString} />
                            </figure>
                            <div className="rows">
                                <h1 className="title row">
                                    {this.props.currentVisibleBuild.item.build.name}
                                </h1>
                                <p className="row subtitle">{race}</p>
                            </div>
                        </div>
                        </div>  
                     </section>
                     <Timeline build={this.props.currentVisibleBuild.item.build} 
                               updateBuild={this.props.updateBuild} 
                               toggleEmpty={this.props.toggleEmpty}
                               fetchById={this.props.fetchById}/>
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