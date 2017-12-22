import React, { Component } from 'react';
import {Redirect,Link} from 'react-router-dom';
import LoadingPlaceholder from './../loadingAnimation'


class User extends Component {
  
  componentWillMount() {
  }
  
  render() {
    const user = this.props.userState.user.user;
    const state = this.props.userState;
    if(user){
      return (
        <div>
          {
            !this.props.userState.user.user
            ? 
              <LoadingPlaceholder />
            :
            <div className="pageContainer">
              {this.props.userState.user.user.username}
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