import React, { Component, PropTypes } from 'react';
import LoginForm from './loginForm';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    
  }

  componentDidMount() {

  }
  render() {
    return (
      <div>
        <LoginForm loginToServer={this.props.loginToServer} inputs={this.props.login.inputs} isFetching={this.props.login.isFetching}/>
      </div>
    );
  }
}

export default Login;