import React, { Component } from 'react';
import RegisterForm from './registerForm';
import {Link} from 'react-router-dom';

class Register extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
      <div>
        <RegisterForm registerNewUser={this.props.registerNewUser} 
                      inputs={this.props.register.inputs} 
                      isFetching={this.props.register.isFetching}
                      updateRegMessage={this.props.updateRegMessage}
                      message={this.props.register.message}/>
        <div className="container">
          <Link to="/login" 
                className="link"> Already signed up? Login here... </Link>
        </div>
      </div>
      </div>
    );
  }
}

export default Register;