import React, { Component } from 'react';
import Input from './../Input/Input';
import LoadingPlaceholder from './../loadingAnimation/loadingAnimation';
import { Redirect } from 'react-router-dom';

class RegisterForm extends Component {
  constructor(props){
    super(props)
        this.state = Object.assign({}, props.register,{
            fireRedirect : false
        })
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  rendermessage(message, time){
    this.props.updateRegMessage(message, time)
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
        var passReg = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
          if(!state.username){
            event.preventDefault();
            this.rendermessage("Please enter a Username", 15000);
        } else if (!state.eMail){
            event.preventDefault();
            this.rendermessage("Please enter an Email", 15000);
        } else if (!state.password || !state.confirmPassword){
            event.preventDefault();
            this.rendermessage("Enter password and confirm", 15000);
        } else if(state.password !== state.confirmPassword){
            event.preventDefault();
            this.rendermessage("Passwords do not match", 15000); 
        } else if(state.password.length < 6){
            event.preventDefault();
            this.rendermessage("Password needs to be at least 6 letters long", 15000); 
        }
        else {
            const buildFormToSubmit = this.state;
            event.preventDefault();
            this.props.registerNewUser(buildFormToSubmit);
            this.setState({ fireRedirect: true })
        }

  } 
  render() {
    const inputsArray = Object.entries(this.props.inputs);
    const fireRedirect = this.state.fireRedirect
    return (
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
                    placeholder={inp[1].label}
                    handleChange={this.handleChange}
                    key={index}
                  />
                )
              })
  
            }
              {
                this.props.isFetching === false 
                ? 
                <button type="submit" value="Submit" className="button is-success is-large is-block">Submit</button> 
                :
                <div>
                <LoadingPlaceholder />
                </div>
                
              } 
            <p className="card-footer-item">{this.props.message}</p>
            {
                    this.props.message==="Success" && (
                      <Redirect to={'/builds'}/>
                    )
              }
            </form>
    );
  }
}

export default RegisterForm;