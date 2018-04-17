import React, { Component } from 'react';

class ChangeUsername extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      confirm: '',
      errorMessage: ''
    }   
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    let state = this.state;
    if(state.username !== state.confirm || !state.username) {
      this.setState({
        errorMessage: 'Please confirm the new username'
    })
  }
  else {
    this.props.changeUsername(this.props.id, state.username);
    window.location.reload();
  }
}
  render() {
    return (
      <div className="modal-card">    
        <div className="modal-card-body">
        <label htmlFor="" className="label">New Username</label>
          <input type="text" className="input" value={this.state.username} name="username" onChange={this.handleChange}/>
        <label htmlFor="" className="label">Confirm</label>
          <input type="text" className="input" value={this.state.confirm} name="confirm" onChange={this.handleChange}/>
        </div>         
          <div className="modal-card-foot">
            <p onClick={this.handleSubmit}className="button is-warning">Change Username</p>
            <p>{this.state.errorMessage}</p>
          </div>
      </div>
    );
  }
}

export default ChangeUsername;