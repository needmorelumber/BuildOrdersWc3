import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import LoadingPlaceholder from './../../components/loadingAnimation';
import Timeline from './../Timeline/Timeline';
import AddOrder from './../BuildSingle/AddOrder';
import TimelineControls from './TimelineControls';
import {StickyContainer, Sticky} from 'react-sticky';
import ReactTooltip from 'react-tooltip'
import './editbuild.sass';

class EditBuild extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: this.props.userState.user.user,
      build: this.props.currentVisibleBuild.item.build
    }
  }
  componentDidMount() {
    this
      .props
      .fetchById(this.props.match.params.id);
    this.setState({
      currentOrder: null
    })
  }
  render() {
    let user = this.state.user
    let build = this.state.build
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
            removeMinute = this.props.removeMinute,
            toggleOrder = this.props.toggleAddingOrder,
            updateOrder = this.props.updateOrder,
            order = this.props.currentVisibleBuild.currentOrder,
            isAdding = this.props.isAdding

      return (
        <div className="container">
          <div className="section columns">
            <div className={isAdding
              ? "column is-8 timelineContainer"
              : "column is-12 timelineContainer"}>
              <TimelineControls
                toggleEmpty={toggleEmpty}
                isToggled={isToggled}
                restoreBuild={restoreBuild}
                addMinute={addMinute}
                removeMinute={removeMinute}/>
              <Timeline
                className="timelineContainer" 
                build={this.props.currentVisibleBuild.item.build}
                fetchById={this.props.fetchById}
                editing={true}
                updateOrder={updateOrder}
                removeItem={removeItem}
                toggleAddingOrder={toggleOrder}
                isAdding={isAdding}/>
            </div>
            <StickyContainer
              className={isAdding
              ? "column is-5 addOrderContainer"
              : "column is-0 addOrderContainer"}>
              <Sticky >
                {({
                  style,
                  isSticky,
                  wasSticky,
                  distanceFromTop,
                  distanceFromBottom,
                  calculatedHeight,
                  topOffset
                }) => {
                  return (
                    <div style={style} className="addOrder">
                      {isAdding
                        ? <AddOrder updateBuild={this.props.updateBuild}/>
                        : null
}
                    </div>
                  )
                }
}
              </Sticky>
            </StickyContainer>
          </div>
        </div>
      );
    } else {
      return (
       <LoadingPlaceholder />
      )
    }
  }
}

export default EditBuild;