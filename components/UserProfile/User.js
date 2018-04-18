import React, { Component } from 'react';
import {Redirect,Link} from 'react-router-dom';
import LoadingPlaceholder from './../loadingAnimation';
import ChangeUsername from './ChangeUsername';
import './user.sass';


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteModalToggle: false,
      changeUsernameModalToggle: '',
      confirmPasswordValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({confirmPasswordValue: event.target.value});
  }
  handleSubmit(event) {
    this.props.deleteUser(this.state.confirmPasswordValue, this.props.userState.user.user._id)
    event.preventDefault();
  }
  componentWillMount() {
    this.props.fetchAndUpdateUser()
  }
  toggleDelete(bool) {
    this.setState({deleteModalToggle: bool})
  }
  toggleChangeuser(bool) {
    this.setState({changeUsernameModalToggle: bool})
  }
  
  render() {
    const user = this.props.userState.user.user;
    const state = this.props.userState;
    let builds;
    if(user){
      if(user.userBuilds !== undefined){
      builds=user.userBuilds.map((build, index)=>{
        return (
          // Render the builds if we need too
           <article key={index} className="userPost card">
               <Link to={'/build/' + build._id}> 
                <h4 className="buildText">{build.name}</h4> 
              </Link>
                <div className="tags">
                    <p>
                        <span className="tag">{build.race}</span>
                        <span className="tag">{build.build_type}</span>
                    </p>
                </div>
                <Link className="button editButton is-info" to={'/build/' + build._id + '/edit'}> <p className="editText"> Edit</p> </Link>
                <Link className="button editButton is-danger" to={'/build/' + build._id + '/edit'}> <p className="editText"> Delete</p> </Link> 
            </article>
        )
      })
    }
      return (
        <div>
          {
            !this.props.userState.user.user
            ? 
              <LoadingPlaceholder />
            :
            <div className="columns">
            {
              this.state.deleteModalToggle
              ?
              <div className="modal is-active">
                <div onClick={()=>{this.toggleDelete(false)}} className="modal-background"></div>                
                <div className="modal-card">
                  <div className="modal-card-head"> <p> Confirm password to delete account forever. </p> </div>
                  <div className="modal-card-body container"> 
                   <input value={this.state.confirmPasswordValue} onChange={this.handleChange}className="input" type="password" placeholder="Confirm Password"/>
                    <p onClick={this.handleSubmit}className="button is-warning">Delete my account and all my builds</p>
                    <p className="is-warning"> {this.props.register.message} </p>
                  </div>
                  
                </div>
                <button onClick={()=>{this.toggleDelete(false)}} className="modal-close is-large" aria-label="close"></button>
              </div>
              :
              null
            }
            {
              this.state.changeUsernameModalToggle
              ?
              <div className="modal is-active">
              <div onClick={()=>{this.toggleChangeuser(false)}} className="modal-background"></div>  
              <ChangeUsername changeUsername={this.props.changeUsername} id={user._id}/>
              <button onClick={()=>{this.toggleChangeuser(false)}} className="modal-close is-large" aria-label="close"></button>
              </div>
              :
              null
            }
              <div className="column is-half">
                <p className="title is-4">{this.props.userState.user.user.username}'s Builds</p>
                <div className="userBuildsContainer"> 
                  { builds
                    ?
                       builds
                    :
                      <div className="has-text-centered"> 
                        <Link to={'/builds'}>Create some Builds!</Link>
                      </div>
                    }
                </div>
              </div>
              <div className="column is-4">
                <nav className="panel userControls"> 
                  <p className="panel-heading">Account Settings</p>
                  <div className="panel-block userControlButtons">
                    <a className="button is-info" onClick={()=>{this.toggleChangeuser(true)}}> Change Username </a>
                    {/* <a className="button is-info"> Change Email </a> */}
                    <a className="button is-danger" onClick={()=>{this.toggleDelete(true)}}> Delete Account </a>
                  </div>
                </nav>
              </div>
            </div>
          }
        </div>
    );
    } else {
      return (
        <div className="section container content">  
          <h2> You're not logged in</h2><Link to='/register'>Make an account here</Link>
        </div>
      )
    }
  }
}
export default User;