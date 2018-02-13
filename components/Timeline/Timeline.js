import React, {Component} from 'react';
import AddOrder from './../BuildSingle/AddOrder';
import InGameHelper from './../../containers/InGameHelper';
import {Redirect} from 'react-router-dom'
import './timeline.sass'

class Timeline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: "",
            id: this.props.build._id
        }
    }
    render() {
        const editingProp = this.props.editing,
              build = this.props.build.build_list,
							id = this.props.build._id,
							getCurrentOrder = this.props.getCurrentOrder,
							isAdding = this.props.isAdding

        // Assign the build from props
        return (
            <div className="section">
                <table className="table tableContainer is-hoverable is-bordered">
                    <thead>
                        <tr>
                            <th className="secondsRow">Time</th>
                            <th>Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {build.map((second, i) => {
                            return (
                                <tr key={i + 1}>
                                  
                                    <td className="secondsRow">
                                        <p>
                                            {this.minuteString(second.second)}
                                        </p>
                                    </td>
                                    <td onClick={() => this.handleClick(second.order)}>
                                        {Object.assign({}, second.order).race_unit}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
    minuteString(seconds) {
        var min = new Date(null);
        min.setSeconds(seconds);
        var result = min
            .toISOString()
            .substr(14, 5)
        return result;
    }
    updateTimeline(updated) {
        this.setState({timeline: updated})
    }
    addSecond() {
        let timeline;
        if (!this.state.isEdit) {
            timeline = this.state.timeline;
        } else {
            this.setState({isEdit: false});
            timeline = this.state.most_recent_timeline;
        };
        const nextSecond = timeline.length + 1;
        const newSecond = {
            second: nextSecond
        };
        timeline.push(newSecond);
        this.saveTimelineToDatabase();
    }
    removeSecond() {
        if (!this.state.isEdit) {
            const timeline = this.state.timeline;
        } else {
            const timeline = this.state.most_recent_timeline;
        };
        const lastSecond = timeline.length - 1;
        timeline.splice(lastSecond, 1);
        this.saveTimelineToDatabase();
    }
    handleClick(data) {
			console.log('clicking')
			console.log(data)
        this
            .props
            .updateOrder(data);
				this
						.props
						.toggleAddingOrder()
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
        this.setState({most_recent_timeline: oldTimeline});
    }

}
export default Timeline;