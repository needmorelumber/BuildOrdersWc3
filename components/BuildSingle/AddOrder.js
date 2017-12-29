import React, { Component } from 'react';
import Input from './../Input';
import { connect } from 'react-redux';
import { newOrder } from './../../actions/actions';
import data from './../../MasterData';
import './buildSingle.css'

class AddOrder extends Component {
  constructor(props) {
    super(props)
    // State of this componenet can be found in the timeline reducer('/reducers/timeline.js') that handles the http calls of the timeline;
    // Functions that operate on the timeline will be contianed within Timeline.js
    this.state = props.addOrderForm;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
                [name]: value
            });
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addOrder(this.state)
  }
  render() {
    const inputsArray = Object.entries(this.state.inputs);
    return (
    <div className="row section AddOrder">
      <div className="panel">
      <p className="panel-heading">Add Command</p>
        <div className="panel-block">
          <form onSubmit={this.handleSubmit}>
          {
              inputsArray.map((inp, index) => {
                  return (
                      <Input  name={inp[1].name}
                              label={inp[1].label}
                              type={inp[1].type}
                              options={inp[1].options}
                              message={inp[1].message}
                              userType={inp[1].userType}
                              list={inp[1].list}
                              class={inp[1].class + " " + "is-small"}
                              handleChange={this.handleChange}
                              key={index}
                              />
                  )
              })
          }        
            <input className="button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state
  }
}
AddOrder = connect(
    mapStateToProps
)(AddOrder);
export default AddOrder;