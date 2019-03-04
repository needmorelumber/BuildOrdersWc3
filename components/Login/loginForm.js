import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../Input/Input';
import LoadingPlaceholder from '../loadingAnimation/loadingAnimation';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.login, {
      fireRedirect: false,
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  rendermessage(message, time) {
    this.props.updateLoginMessage(message, time);
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const { state } = this;
    if (!state.eMail) {
      event.preventDefault();
      this.rendermessage('Please Enter Email', 3000);
    } else if (!state.password) {
      event.preventDefault();
      this.rendermessage('Enter password', 3000);
    } else {
      const buildFormToSubmit = this.state;
      event.preventDefault();
      this.props.loginToServer(buildFormToSubmit);
    }
  }

  render() {
    const inputsArray = Object.entries(this.props.inputs);
    const { fireRedirect } = this.state;
    return (
      <form onSubmit={this.handleSubmit} id="loginForm" className="go-bottom">
        {
              inputsArray.map((inp, index) => (
                <Input
                  name={inp[1].name}
                  label={inp[1].label}
                  type={inp[1].type}
                  userType={inp[1].userType}
                  class={inp[1].class}
                  handleChange={this.handleChange}
                  key={index}
                />
              ))

            }

        {
                this.props.isFetching === false
                  ? <button type="submit" className="button is-large is-dark is-block">Login</button>
                  : <LoadingPlaceholder />

              }
        <p className="card-footer-item">{this.props.message}</p>
        {
                    this.props.message === 'Success' && (
                      <Redirect to="/builds" />
                    )
              }
      </form>
    );
  }
}

export default LoginForm;
