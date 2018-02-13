import React, { Component } from 'react';

class EditOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== undefined){
      this.setState({data: nextProps.data.order});
    }
  }

  // METHODS FOR DIFFING THE ORDER

  // CALLING UPDATE PER BUILD ID... SENDING BACK THE POSITION IN THE ARRAY..
  handleChange(event) {
    console.log(this)
  }
  handleSubmit() {
    console.log('finished changing these fields and now we will call the database');
    
  }
  render() {
    const stateData = this.state.data
    return (
      <div className="panel currentOrder">
        { stateData
          ?
          <div>
            <p>Race Unit</p>
              <input defaultValue={stateData ? stateData.race_unit : 'Enter a unit'}
              onChange={this.handleChange} value={this.state.race_unit} ref={(input) => this.race = input}/>
            <p>Notes</p>
              <input defaultValue={stateData ? stateData.notes : 'Enter some notes'}
              onChange={this.handleChange} value={this.state.notes} ref={(input) => this.notes = input}/>
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default EditOrder;