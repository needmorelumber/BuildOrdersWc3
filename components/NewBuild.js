import React, { Component } from 'react';
import { Link,  Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { newBuild } from '../actions/actions'
import Input from './Input'


class NewBuild extends Component {
    constructor(props){
        super(props);
        // State of this componenet can be found in builds reducer.
        // FORM STATE IS MAINTAINED IN REACT STATE
        this.state = props.newBuildForm;
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
        event.preventDefault();
        const buildFormToSubmit = this.state;
        this.props.dispatch(newBuild(buildFormToSubmit))
  }
    render() {
        const inputsArray = Object.entries(this.state.inputs);
        return (
                <div className="modal is-active">
                    <Link to="/builds"><div className="modal-background"></div></Link>
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
                            </section>
                            <footer className="modal-card-foot"> 
                            <p className="subtitle help is-danger"> {this.props.newBuildForm.message} </p>
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