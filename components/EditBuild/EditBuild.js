import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import LoadingPlaceholder from './../../components/loadingAnimation';
import Timeline from './../Timeline/Timeline';
import AddOrder from './../BuildSingle/AddOrder';
import TimelineControls from './TimelineControls';
import {StickyContainer, Sticky} from 'react-sticky';
import EditOrder from './EditOrder';
import './editbuild.sass';

class EditBuild extends Component {

  componentDidMount() {
    this
      .props
      .fetchById(this.props.match.params.id);
    this
      .props
      .fetchAndUpdateUser();
    this.state = {
      currentOrder: null
    }
  }
  render() {
    let user = this.props.userState.user.user;
    let build = this.props.currentVisibleBuild.item.build;
    if (build && user) {
      if (build.ownerId !== user._id) {
        return (
          <Redirect></Redirect>
        )
      }
      const isToggled = this.props.currentVisibleBuild.isToggledOrders,
            toggleEmpty = this.props.toggleEmpty,
            restoreBuild = this.props.restoreBuild,
            removeItem = this.props.removeItem,
            addMinute = this.props.addMinute,
            toggleOrder = this.props.toggleAddingOrder,
            updateOrder = this.props.updateOrder,
            order = this.props.currentVisibleBuild.currentOrder,
            isAdding = this.props.isAdding

      return (
        <div className="rows">
          <div className="rows sideMenu">
            <div className="AddOrder row">
            </div>
            <div className="TimelineControls row">
              <TimelineControls
                toggleEmpty={toggleEmpty}
                isToggled={isToggled}
                restoreBuild={restoreBuild}
                addMinute={addMinute}/>
            </div>
          </div>
          <div className="section columns">
            <Timeline
              build={this.props.currentVisibleBuild.item.build}
              fetchById={this.props.fetchById}
              editing={true}
              updateOrder={updateOrder}
              removeItem={removeItem}
              toggleAddingOrder={toggleOrder}
              isAdding={isAdding}/>

              { isAdding
                ? <AddOrder updateBuild={this.props.updateBuild}/>
                : null
              } 
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