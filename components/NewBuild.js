import React, { Component } from 'react';
import { Link,  Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {newBuild} from '../actions/build'
import {fetchAndUpdateUser} from '../actions/user'
import Input from './Input'
import './custom.sass';


class NewBuild extends Component {
    constructor(props){
        super(props);
        // Fields of this form componenet can be found in builds reducer.
        // Form state like message and ui toggles are maintained in react state,
        this.state = Object.assign(props.userState, props.newBuildForm, {
            fireRedirect : false,
            fireFailedToBeLoggedInRedirect: false,
            errorMessage: "",
            Form: {}
        })
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
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
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const nextFormState = {...this.state.Form, [name]: value}
        this.setState({
                Form: nextFormState
            });
    }
    handleSubmit(event) {
        event.preventDefault();
        const state = this.state.Form;
        state.ownerId = this.props.userState.user.user._id;
        state.ownerUsername =  this.props.userState.user.user.username;
        if (!state.name){
            this.renderErrorMessage("Please name the build", 3000);
        } else if (!state.description){
            this.renderErrorMessage("Please provide a description", 3000);
        } else if (!state.race){
            this.renderErrorMessage("Race is required", 3000);
        } else {
            const buildFormToSubmit = this.state.Form;
            this.props.dispatch(newBuild(buildFormToSubmit))
            this.setState({ fireRedirect: true })
        }

  } 
    render() {
        const from = this.props.location.state || '/'
        const fireRedirect = this.state.fireRedirect
        const inputsArray = Object.entries(this.state.inputs);
        return (
                <div className="modal is-active" id="newBuildForm">
                { !this.props.userState.user.user && (<Redirect to={'/builds'}/>)}
                    <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head"> 
                                <p className="modal-card-title"> Submit a new build </p>
                                <Link to="/builds"><button className="delete" aria-label="close"></button></Link>
                            </header>
                            <section className="modal-card-body">
                            <form onSubmit={this.handleSubmit}>
                                {
                                    inputsArray.map((inp, index) => {
                                        return (
                                            <Input  name={inp[1].name}
                                                    label={inp[1].label}
                                                    type={inp[1].type}
                                                    userType={inp[1].userType}
                                                    options={inp[1].options}
                                                    message={inp[1].message}
                                                    class={inp[1].class}
                                                    handleChange={this.handleChange}
                                                    key={index}
                                                    />
                                        )
                                    })
                                }              
                                <button type="submit" value="Submit" className="button is-success">Submit</button>
                            </form>
                            {
                                fireRedirect && (
                                    <Redirect to={'/builds'}/>
                                )
                            }
                            </section>
                            <footer className="modal-card-foot"> 
                            <p className="subtitle help is-danger"> {this.state.errorMessage} </p>
                            </footer>
                        </div>
                </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
    ...state
  }
}
NewBuild = connect(
    mapStateToProps
)(NewBuild);
export default NewBuild;