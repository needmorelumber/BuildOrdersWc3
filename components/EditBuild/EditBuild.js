import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoadingPlaceholder from './../../components/loadingAnimation';
import Timeline from './../Timeline/Timeline';
import AddOrder from './../BuildSingle/AddOrder';

class EditBuild extends Component {
  
  componentWillMount() {
    this.props.fetchById(this.props.match.params.id);
    this.props.fetchAndUpdateUser();
  }
  
  render() {
    let user=this.props.userState.user.user;
    let build=this.props.currentVisibleBuild.item.build;
    if(build && user){
      if(build.ownerId !== user._id){
        return (
          <Redirect to='/builds' />
        )
      }
    return (
      <div className="columns">
      <div className="column">
        <AddOrder id={this.props.match.params.id} fetchById={this.props.fetchById} />
      </div>
      <div className="column">
        <Timeline             build={this.props.currentVisibleBuild.item.build} 
                              updateBuild={this.props.updateBuild} 
                              toggleEmpty={this.props.toggleEmpty}
                              fetchById={this.props.fetchById}/>
      </div>
      </div>
    );
    } else {
      return (
        <div>
        <LoadingPlaceholder />
        </div>
      )
    }
  }
}

export default EditBuild;