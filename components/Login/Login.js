import React, { Component, PropTypes } from 'react';
import path from 'path'
import LoginForm from './loginForm';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-grey">Login</h3>
                <p className="subtitle has-text-grey">Please login to proceed.</p>
                <div className="box">
                  <figure className="avatar">
                    <img src={path.resolve("/assets/Orc.png")}/>
                  </figure>
                    <LoginForm loginToServer={this.props.loginToServer} 
                                inputs={this.props.login.inputs} 
                                isFetching={this.props.login.isFetching}
                                message={this.props.login.message}
                                updateLoginMessage={this.props.updateLoginMessage}/>
                </div>
                <p className="has-text-grey">
                  &nbsp;·&nbsp; <Link to="/register" className="link"> Sign Up </Link> &nbsp;·&nbsp;
                </p>
              </div>
            </div>
          </div>
        </section>
      <div className="container">
         
        </div>
      </div>
    );
  }
}

export default Login;