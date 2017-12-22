import React, { Component, PropTypes } from 'react';
import LoginForm from './loginForm';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <LoginForm loginToServer={this.props.loginToServer} 
                   inputs={this.props.login.inputs} 
                   isFetching={this.props.login.isFetching}
                   message={this.props.login.message}
                   updateLoginMessage={this.props.updateLoginMessage}/>
        <div className="container">
          <Link to="/register" className="link">Need to register?</Link>
        </div>
      </div>
    );
  }
}

export default Login;