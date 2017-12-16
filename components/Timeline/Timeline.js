import React, { Component } from 'react';
import AddOrder from './../BuildSingle/AddOrder';
import InGameHelper from './../../containers/InGameHelper';


class Timeline extends Component {
    constructor(props){
        super(props)
        this.state = {
            message: "",
            timeline: this.props.build.build_list,
            most_recent_timeline: [],
            isEdit: false,
            justOrders: this.returnJustOrders(this.props.build.build_list),
            id: this.props.build._id,
        }
        this.addOrder = this.addOrder.bind(this);
    }
    updateTimeline(updated){
        this.setState({
            timeline: updated
        })
    }
    renderErrorMessage(message) {
        this.setState({
            message: message
        })
        window.setTimeout(()=>{
            this.setState({
                message: ""
            })
        }, 2800)

    }
    returnJustOrders(buildList) {
        let newTimeline = [];
            for (let i = 0; i < buildList.length; i++) {
                let order = buildList[i].order;
                if(order){
                    newTimeline.push(buildList[i])
                }
            }
            return newTimeline
    } 
    toggleEmptyLogic(timeline) {
    const isEdit=this.state.isEdit;
    if (isEdit) {
        this.setState({
            justOrders: this.state.timeline,
            timeline: this.state.most_recent_timeline,
            most_recent_timeline: [],
            isEdit: false
            })
    } else {
    let newTimeline = [];
          for (let i = 0; i < timeline.length; i++) {
              let order = timeline[i].order;
              if(order){
                  newTimeline.push(timeline[i])
              }
          }
          this.setState({
              justOrders: newTimeline,
              most_recent_timeline: timeline,
              timeline: newTimeline,
              isEdit: true
          })
    }
    }
    render() {
        // Assign the build from props
        return (
            <div className="columns">
                <div className="column is-8">
                    <div className="panel">
                        <p className="panel-heading"> Timeline Controls </p>
                        <div className="panel-block">
                            <p className="help is-danger">{this.state.message}</p>
                        </div>
                        <div className="panel-block">
                            <button className="button is-link is-outlined" onClick={()=>{this.toggleEmptyLogic(this.state.timeline)}}> {this.state.isEdit === true ? 'Show' : 'Hide'} orderless seconds </button>
                            <button className="button is-link is-outlined" onClick={()=>{this.addSecond()}}> Add Second </button>
                        </div>     
                    </div>
                    <table className="table is-fullwidth is-hoverable is-bordered">
                        <thead>
                            <tr>
                                <th>Second in Game</th>
                                <th>Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.timeline.map((second, i) => {
                                return (
                                    <tr key={i + 1}>
                                        <td>
                                            <p>
                                                {second.second}
                                            </p>
                                        </td>
                                            <td>
                                                {Object.assign({}, second.order).race_unit}
                                            </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="column">
                    <InGameHelper addOrder={this.addOrder}isEdit={this.state.isEdit} justOrders={this.state.justOrders} totalLength={this.state.timeline.length}/> 
                </div>
            </div>
        );
    }
     addSecond() {
        let timeline;
         if(!this.state.isEdit) {
             timeline = this.state.timeline;
         } else {
             this.setState({isEdit:false});
             timeline = this.state.most_recent_timeline;
         };
        const nextSecond = timeline.length + 1;
        const newSecond = { second: nextSecond };
        timeline.push(newSecond);
        this.saveTimelineToDatabase();
    }
    removeSecond() {
         if(!this.state.isEdit) {
             const timeline = this.state.timeline;
         } else {
             const timeline = this.state.most_recent_timeline;
         };
        const lastSecond = timeline.length - 1;
        timeline.splice(lastSecond, 1);
        this.saveTimelineToDatabase();
    }
    addOrder(order){
        const isEdit = this.state.isEdit;
        let timeline;
        switch(isEdit) {
            case true:
                timeline = this.state.most_recent_timeline;

            case false:
                timeline = this.state.timeline;

        }
            // Check that the timeline is long enough
        if(order.second === 0) {
            this.renderErrorMessage("Game doesn't have 0 second")
            return;
        }
        if(order.second === "" || order.second === undefined) {
            this.renderErrorMessage("Need to specify a second")
            return;
        }

        if(parseInt(order.second) > timeline.length + 1){
            this.renderErrorMessage("Please Make timeline longer")
            return;
        }
        const arrPosOfSecond = order.second - 1;
        const formatttedOrderToPush = {
            race_unit: order.race_unit,
            count: order.count,
            time: order.second,
            notes: order.notes,
            supply_cost: order.supply_cost,
            }
            timeline[arrPosOfSecond].order=formatttedOrderToPush;
        this.saveTimelineToDatabase();
        
    }
    setupTimeline(vals) {
        let max = 0;
        for (let i = 0; i < vals.length; i++) {
            if (vals[i].second * 1000 > max) {
                max = vals[i].second * 1000;
            }
        }
        let cells = max / 1000;
        let timeline = [];
        let values = vals
        for (let i = 0; i < cells; i++) {
            let oneSecond = {
                second: i + 1,
                order: {}
            }
            timeline.push(oneSecond);
        }
        //create object map of second values and use that instead
        for (let i = 0; i < timeline.length; i++) {
            for (let k = 0; k < values.length; k++) {
                if (values[k].second === timeline[i].second) {
                    const order = values[k].order;
                    timeline[i].order = order;

                }
            }
        }
        return timeline;
    }
    saveCurrentTimeline(timeline) {
        let oldTimeline = []
        timeline.map(order => {
            return oldTimeline.push(order);
        })
        this.setState({ most_recent_timeline: oldTimeline });
    }
    saveTimelineToDatabase() {
        let buildToSend;
        const id = this.state.id;
        if(this.state.isEdit === true) {
            buildToSend = this.state.most_recent_timeline;
            console.log(id)
            this.props.updateBuild(buildToSend, id)
            this.updateTimeline(buildToSend);
        } else {
            buildToSend = this.state.timeline;
            this.props.updateBuild(buildToSend, id)
            this.updateTimeline(buildToSend);
        }
        
    }

}
export default Timeline;