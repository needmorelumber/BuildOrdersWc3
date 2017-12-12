import React, { Component } from 'react';
import AddOrder from './../BuildSingle/AddOrder';
import InGameHelper from './../../containers/InGameHelper';


class Timeline extends Component {
    constructor(props){
        super(props)
        this.state ={
            message: "",
            timeline: [],
            most_recent_timeline: [],
            isEdit: false
        }
        this.addOrder = this.addOrder.bind(this);
    }
    componentWillMount() {
        const build = this.props.build;
        if(build.build_list){
            const timeline = this.setupTimeline(build.build_list);
        }
    }
    updateTimeline(updated){
        this.setState({
            timeline: updated
        })
    }
    saveTimelineToDatabase() {
        let buildToSend;
        const id = this.state.id;
        if(this.state.isEdit === true) {
            buildToSend = this.props.most_recent_timeline;
            this.props.updateBuild(buildToSend, id)
            this.updateTimeline(buildToSend);
        } else {
            buildToSend = this.props.timeline;
            this.props.updateBuild(buildToSend, id)
            this.updateTimeline(buildToSend);
        }
        
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
    render() {
        // Assign the build from props
        const timeline = this.props.build.build_list;
        if(timeline){
        return (
            <div className="columns">
                <div className="column is-8">
                    <div className="panel">
                        <p className="panel-heading"> Timeline Controls </p>
                        <div className="panel-block">
                            <p className="help is-danger">{this.state.message}</p>
                        </div>
                        <div className="panel-block">
                            <button className="button is-link is-outlined" onClick={()=>{this.toggleEmpty()}}> {this.state.isEdit === true ? 'Show' : 'Hide'} orderless seconds </button>
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
                            {timeline.map((second, i) => {
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
                    <InGameHelper /> 
                    <AddOrder addOrder={this.addOrder}/>
                </div>
            </div>
        );
        }else {
            return (
                <div>Could not load</div>
            )
        }
        
    }
     getOrderArray(){

     }
     addSecond() {
        const timeline = this.state.timeline;
        const nextSecond = timeline.length + 1;
        const newSecond = { second: nextSecond };
        timeline.push(newSecond);
        this.saveTimelineToDatabase();
    }
    removeSecond() {
        const timeline = this.state.timeline;
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

}
export default Timeline;