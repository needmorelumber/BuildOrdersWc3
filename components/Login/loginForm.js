import React, { Component } from 'react';
import Input from './../Input';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props){
    super(props)
        this.state = Object.assign({}, props.login,{
            fireRedirect : false,
            errorMessage: ""
        })
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
                [name]: value
            });
  }
  handleSubmit(event) {
        const state = this.state;
        if (!state.eMail){
            event.preventDefault();
            this.renderErrorMessage("Please ", 3000);
        } else if (!state.password){
            event.preventDefault();
            this.renderErrorMessage("Enter password", 3000);
        }
        else {
            const buildFormToSubmit = this.state;
            event.preventDefault();
            this.props.loginToServer(buildFormToSubmit);
            this.setState({ fireRedirect: true })
        }

  } 
  render() {
    const inputsArray = Object.entries(this.props.inputs);
    const fireRedirect = this.state.fireRedirect
    return (
      <div className="section">
        <article className="container">
          <div className="card">
          <div className="card-header">
            <div className="card-header-title title is-centered">Login</div>
          </div>
          <div className="card-content">
          <form onSubmit={this.handleSubmit}>
            {
              inputsArray.map((inp, index)=>{
                return (
                  <Input
                    name={inp[1].name}
                    label={inp[1].label}
                    type={inp[1].type}
                    userType={inp[1].userType}
                    class={inp[1].class}
                    handleChange={this.handleChange}
                    key={index}
                  />
                )
              })
  
            }
            
              {
                this.props.isFetching === false 
                ? 
                <button type="submit" value="Submit" className="button is-success">Submit</button> 
                :
                <div>Loading...</div>
                
              }
              
            </form>
                  {
                    fireRedirect && (
                      <Redirect to={'/builds'}/>
                    )
                  }
            </div>
            <div className="card-footer">
                <p className="card-footer-item">{this.state.errorMessage}</p>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default LoginForm;