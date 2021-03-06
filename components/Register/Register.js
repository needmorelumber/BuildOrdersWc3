import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './registerForm';

class Register extends Component {
  render() {
    return (
      <div>
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-grey">Register</h3>
                <p className="subtitle has-text-grey">Thanks for signing up! </p>
                <div className="box">
                  <figure className="avatar">
                    <img src="https://s3.us-west-2.amazonaws.com/needmorelumberassets/Orc.png" />
                  </figure>
                  <RegisterForm
                    registerNewUser={this.props.registerNewUser}
                    inputs={this.props.register.inputs}
                    isFetching={this.props.register.isFetching}
                    updateRegMessage={this.props.updateRegMessage}
                    message={this.props.register.message}
                  />
                </div>
                <p className="has-text-grey">
                  &nbsp;·&nbsp; <Link to="/login" className="link"> Already a user? Login here </Link> &nbsp;·&nbsp;
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="container" />
      </div>
    );
  }
}

export default Register;
