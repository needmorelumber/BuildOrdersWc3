import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AddOrder from '../BuildSingle/AddOrder';
import InGameHelper from '../../containers/InGameHelper';
import './timeline.sass';
import ReactTooltip from 'react-tooltip';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      id: this.props.build._id,
      currRow: null,
    };
  }

  handleRowHover(e, i) {
    const currrow = `row${i}`;
    this.setState({ currRow: i });
  }

  handleMouseLeave() {
    this.setState({ currRow: null });
  }

  render() {
    const editingProp = this.props.editing;
    const build = this.props.build.build_list;
    const id = this.props.build._id;
    const { getCurrentOrder } = this.props;
    const { isAdding } = this.props;

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
            {build.map((second, i) => (
              <tr
                key={i + 1}
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseOver={() => this.handleRowHover(event, i)}
              >
                {this.state.currRow === i && editingProp
																		  ? (
  <td>
    <div className="field is-grouped">
      <ReactTooltip place="right" effect="solid" />
      <p className="control" onClick={() => this.handleClick(second.order, i)} data-tip={!build[i].order.race_unit ? 'Add Order' : 'Edit Order'}>
        <a className="button">
          <span className="icon is-small">
            <i className={!build[i].order.race_unit ? 'fa fa-plus' : 'fa fa-edit'} />
          </span>
        </a>
      </p>
      <p className="control" onClick={() => this.props.removeItem(build, id, i)} data-tip="Remove Order">
        <a className="button">
          <span className="icon is-small">
            <i className="fa fa-trash" />
          </span>
        </a>
      </p>
    </div>
  </td>
                  )
																		  : (
  <td className="secondsRow">
    <p>
      {this.minuteString(second.second)}
    </p>
  </td>
                  )
}
                <td onClick={() => this.handleClick(second.order, i)}>
                  {Object.assign({}, second.order).race_unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  minuteString(seconds) {
    const min = new Date(null);
    min.setSeconds(seconds);
    const result = min
      .toISOString()
      .substr(14, 5);
    return result;
  }

  updateTimeline(updated) {
    this.setState({ timeline: updated });
  }

  addSecond() {
    let timeline;
    if (!this.state.isEdit) {
      timeline = this.state.timeline;
    } else {
      this.setState({ isEdit: false });
      timeline = this.state.most_recent_timeline;
    }
    const nextSecond = timeline.length + 1;
    const newSecond = {
      second: nextSecond,
    };
    timeline.push(newSecond);
    this.saveTimelineToDatabase();
  }

  handleClick(data, i) {
    this
      .props
      .updateOrder(data);
    this.props.editing === true
      ? this
        .props
        .toggleAddingOrder(true)
      : null;
  }

  // setupTimeline(vals) { 		let max = 0; 		for (let i = 0; i < vals.length; i++)
  // { 				if (vals[i].second * 1000 > max) { 						max = vals[i].second * 1000;
  // 				} 		} 		let cells = max / 1000; 		let timeline = []; 		let values = vals
  // 		for (let i = 0; i < cells; i++) { 				let oneSecond = { 						second: i +
  // 1, 						order: {second: i + 1} 				} 				timeline.push(oneSecond); 		}
  // 		//create object map of second values and use that instead 		for (let i = 0;
  // i < timeline.length; i++) { 				for (let k = 0; k < values.length; k++) {
  // 						if (values[k].second === timeline[i].second) { 								const order =
  // values[k].order; 								timeline[i].order = order; 						} 				} 		}
  // 		console.log(timeline) 		return timeline; }
  saveCurrentTimeline(timeline) {
    const oldTimeline = [];
    timeline.map(order => oldTimeline.push(order));
    this.setState({ most_recent_timeline: oldTimeline });
  }
}
export default Timeline;
