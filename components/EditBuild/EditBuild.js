import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoadingPlaceholder from './../../components/loadingAnimation';
import Timeline from './../Timeline/Timeline';
import AddOrder from './../BuildSingle/AddOrder';
import TimelineControls from './TimelineControls';
import { StickyContainer, Sticky} from 'react-sticky';
import CurrentOrder from './CurrentOrder';
import './editbuild.sass';

class EditBuild extends Component {
  
  componentDidMount() {
    this.props.fetchById(this.props.match.params.id);
    this.props.fetchAndUpdateUser();
    this.state = {
     currentOrder:null
    }
  }
  render() {
    let user=this.props.userState.user.user;
    let build=this.props.currentVisibleBuild.item.build;
    if(build && user){
      if(build.ownerId !== user._id){
        return (
          <Redirect></Redirect>
        )
      }
    const isToggled=this.props.currentVisibleBuild.isToggledOrders,
          toggleEmpty=this.props.toggleEmpty,
          restoreBuild=this.props.restoreBuild,
          removeItem=this.props.removeItem,
          addMinute=this.props.addMinute,
          toggleOrder=this.props.toggleAddingOrder,
          updateOrder=this.props.updateOrder,
          order=this.props.currentVisibleBuild.currentOrder,
          isAdding=this.props.isAdding

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
                        { isAdding
                          ?
                          <AddOrder 
                          updateBuild={this.props.updateBuild}/>
                          :
                          null
                        }
                        </div>
                        <div className="TimelineControls column">
                          <TimelineControls 
                          toggleEmpty={toggleEmpty} 
                          isToggled={isToggled} 
                          restoreBuild={restoreBuild} 
                          addMinute={addMinute}/>
                          <div>
                          { order
                            ?
                            <CurrentOrder data={order}></CurrentOrder>    
                            :
                            null
                          }
                          </div>
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
        updateOrder={updateOrder}
        removeItem={removeItem}
        toggleAddingOrder={toggleOrder}
        isAdding={isAdding}/>
      </div>
      </div>
    );
    } else {
      return (
        <div>
          <Redirect to={'/builds'}/>
        </div>
      )
    }
  }
}

export default EditBuild;