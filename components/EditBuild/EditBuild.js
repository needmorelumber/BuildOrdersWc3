import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoadingPlaceholder from './../../components/loadingAnimation';
import Timeline from './../Timeline/Timeline';
import AddOrder from './../BuildSingle/AddOrder';
import TimelineControls from './TimelineControls';
import { StickyContainer, Sticky} from 'react-sticky';

import './editbuild.css';

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
      <StickyContainer className="column">
        <Sticky >
          {
            ({
              style,
              isSticky,
              wasSticky,
              distanceFromTop,
              distanceFromBottom,
              calculatedHeight,
              topOffset
      
            }) => {
              return (
                     <div style={style} >
                        <div className="AddOrder"> 
                          <AddOrder id={this.props.match.params.id} fetchById={this.props.fetchById} />
                        </div>
                        <div className="TimelineControls">
                          <TimelineControls />
                        </div>  
                    </div>
              )
            }
          }
        </Sticky>
      </StickyContainer>
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