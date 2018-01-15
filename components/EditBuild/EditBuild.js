import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoadingPlaceholder from './../../components/loadingAnimation';
import Timeline from './../Timeline/Timeline';
import AddOrder from './../BuildSingle/AddOrder';
import TimelineControls from './TimelineControls';
import { StickyContainer, Sticky} from 'react-sticky';
import './editbuild.sass';

class EditBuild extends Component {
  
  componentDidMount() {
    this.props.fetchById(this.props.match.params.id);
    this.props.fetchAndUpdateUser();
  }
componentWillUpdate(nextProps, nextState) {
  
} 
  render() {
    let user=this.props.userState.user.user;
    let build=this.props.currentVisibleBuild.item.build;
    if(build && user){
      if(build.ownerId !== user._id){
        return (
          <LoadingPlaceholder />
        )
      }
    const isToggled=this.props.currentVisibleBuild.isToggledOrders;
    const toggleEmpty=this.props.toggleEmpty;
    const restoreBuild=this.props.restoreBuild;
    const removeItem=this.props.removeItem;
    const addMinute=this.props.addMinute;
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
                     <div className="columns sideMenu" style={style} >
                        <div className="AddOrder column"> 
                          <AddOrder 
                          updateBuild={this.props.updateBuild}/>
                        </div>
                        <div className="TimelineControls column">
                          <TimelineControls 
                          toggleEmpty={toggleEmpty} 
                          isToggled={isToggled} 
                          restoreBuild={restoreBuild} 
                          addMinute={addMinute}/>
                        </div>  
                    </div>
              )
            }
          }
        </Sticky>
      </StickyContainer>
      <div className="column">
        <Timeline             
        build={this.props.currentVisibleBuild.item.build} 
        fetchById={this.props.fetchById}
        editing={true}
        removeItem={removeItem}/>
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