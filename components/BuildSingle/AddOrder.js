import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../Input/Input';
import { updateAddOrderMessage, toggleAddingOrder } from '../../actions/build';
import data from '../../MasterData';
import './buildSingle.sass';

class AddOrder extends Component {
  constructor(props) {
    super(props);
    // State of this componenet can be found in the timeline reducer('/reducers/timeline.js') that handles the http calls of the timeline;
    // Functions that operate on the timeline will be contianed within Timeline.js
    const order = this.props.currentVisibleBuild.currentOrder;
    this.state = Object.assign(props.userState, props.addOrderForm, {
      errorMessage: '',
      Form: {
        race_unit: order.order.race_unit || '',
        count: order.order.count || '',
        notes: order.order.notes || '',
      },
      activeOrder: false,
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderErrorMessage(messageContent, time) {
    this.setState({
      errorMessage: messageContent,
    });
    window.setTimeout(() => {
      this.setState({
        errorMessage: '',
      });
    }, time);
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const nextFormState = { ...this.state.Form, [name]: value };
    this.setState({
      Form: nextFormState,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    this.saveCurrentVisible();
  }

  minuteString(seconds) {
    const min = new Date(null);
    min.setSeconds(seconds);
    const result = min
      .toISOString()
      .substr(14, 5);
    return result;
  }

  componentWillMount() {
    if (this.props.currentVisibleBuild.currentOrder.order.race_unit) {
      const { order } = this.props.currentVisibleBuild.currentOrder;
      const unit = order.race_unit;
      const { notes } = order;
      const { count } = order;
      const nextFormState = {
        race_unit: unit,
        notes,
        count,
      };
      this.setState({
        activeOrder: true,
        Form: nextFormState,
      });
    } else { this.setState({ activeOrder: false, Form: {} }); }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentVisibleBuild.currentOrder.order.race_unit) {
      const { order } = nextProps.currentVisibleBuild.currentOrder;
      const unit = order.race_unit;
      const { notes } = order;
      const { count } = order;
      const nextFormState = {
        race_unit: unit,
        notes,
        count,
      };
      this.setState({
        activeOrder: true,
        Form: nextFormState,
      });
    } else { this.setState({ activeOrder: false, Form: {} }); }
  }

  render() {
    const inputsArray = Object.entries(this.state.inputs);
    return (
      <div className="AddOrder">
        <div className="panel">
          <p className="panel-heading">{!this.state.activeOrder ? 'Adding' : 'Editing'} Command for {this.minuteString(this.props.currentVisibleBuild.currentOrder.order.second)}<i onClick={() => this.props.toggleAddingOrder(false)} className="fa fa-close closeButton" style={{ marginRight: '1%' }} /></p>
          <div className="panel-block">
            <form onSubmit={this.handleSubmit}>
              {
              inputsArray.map((inp, index) => (
                <Input
                  name={inp[1].name}
                  label={inp[1].label}
                  type={inp[1].type}
                  options={inp[1].options}
                  message={inp[1].message}
                  userType={inp[1].userType}
                  list={inp[1].list}
                  class={`${inp[1].class} ` + 'is-large is-block' + ' ' + 'without_ampm'}
                  handleChange={this.handleChange}
                              // initialValue={this.state.Form[inp[1].name]}
                  key={index}
                  placeholder={inp[1].label}
                />
              ))
          }
              <input className="button" type="submit" value={this.state.activeOrder ? 'Save Edit' : 'Add Order'} />
            </form>
          </div>
          <p className="subtitle help is-danger"> {this.props.addOrderForm.message} </p>
        </div>
      </div>
    );
  }

  rendermessage(message, time) {
    this.props.updateAddOrderMessage(message);
    window.setTimeout(() => {
      this.props.updateAddOrderMessage('');
    }, time);
  }

  saveCurrentVisible() {
    const order = this.state.Form;
    order.second = this.props.currentVisibleBuild.currentOrder.order.second;
    const renderErrorMessage = this.props.updateAddOrderMessage;
    if (order.second === 0) {
      this.rendermessage("Game doesn't have 0 second", 3000);
      return;
    }
    if (order.second === ' ' || order.second === undefined) {
      this.rendermessage('Need to specify a second', 3000);
    } else if (parseInt(order.second) > this.props.currentVisibleBuild.item.build.build_list.length + 1) {
      this.rendermessage('Please Make timeline longer', 3000);
    } else {
      const { build } = this.props.currentVisibleBuild.item;
      const buildList = this.props.currentVisibleBuild.item.build.build_list;
      const id = build._id;
      const arrPosOfSecond = order.second - 1;
      const formatttedOrderToPush = {
        race_unit: order.race_unit,
        count: order.count,
        second: order.second,
        notes: order.notes,
        supply_cost: order.supply_cost,
      };
      buildList[arrPosOfSecond].order = formatttedOrderToPush;
      this.props.updateBuild(buildList, id);
    }
  }
}

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = dispatch => ({
  updateAddOrderMessage: message => {
    dispatch(updateAddOrderMessage(message));
  },
  toggleAddingOrder: bool => {
    dispatch(toggleAddingOrder(bool));
  },
});
AddOrder = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddOrder);
export default AddOrder;
