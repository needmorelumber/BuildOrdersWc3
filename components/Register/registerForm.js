import React, { Component } from 'react';
import Input from './../Input';

class RegisterForm extends Component {
  constructor(props){
    super(props)
        this.state = Object.assign({}, props.register,{
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
  renderErrorMessage(messageContent, time) {
        this.setState({
            errorMessage: messageContent
        })
        window.setTimeout(()=>{
            this.setState({
                errorMessage: ""
            })
        }, time)
    }
  handleSubmit(event) {
        const state = this.state;
          if(!state.username){
            event.preventDefault();
            this.renderErrorMessage("Please enter a Username", 3000);
        } else if (!state.eMail){
            event.preventDefault();
            this.renderErrorMessage("Please enter an Email", 3000);
        } else if (!state.password || !state.confirmPassword){
            event.preventDefault();
            this.renderErrorMessage("Enter password and confirm", 3000);
        } else if(state.password !== state.confirmPassword){
            event.preventDefault();
            this.renderErrorMessage("Passwords do not match", 3000); 
        }
        else {
            const buildFormToSubmit = this.state;
            event.preventDefault();
            this.props.registerNewUser(buildFormToSubmit);
            // this.setState({ fireRedirect: true })
        }

  } 
  render() {
    const inputsArray = Object.entries(this.props.inputs);
    return (
      <div className="section">
        <article className="container">
          <div className="card">
          <div className="card-header">
            <div className="card-header-title title is-centered">Register new account</div>
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
                <div>Thanks for registering! Waiting for server...</div>
                
              } 
            </form>
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

export default RegisterForm;