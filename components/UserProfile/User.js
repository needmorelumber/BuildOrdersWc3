import React, { Component } from 'react';
import {Redirect,Link} from 'react-router-dom';
import LoadingPlaceholder from './../loadingAnimation';
import './user.sass';


class User extends Component {
  
  componentWillMount() {
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
    } else {
      return (
        <div> 
          <Link to={'/builds'}>Create some Builds!</Link>
        </div>
      )
    }
    // render the main user page
      return (
        <div>
          {
            !this.props.userState.user.user
            ? 
              <LoadingPlaceholder />
            :
            <div className="columns">
              <div className="column is-half">
                <p className="title is-4">{this.props.userState.user.user.username}'s Builds</p>
                <div className="userBuildsContainer"> 
                  {builds}
                </div>
              </div>
              <div className="column is-half">
                <p className="title is-4">Account Settings</p>
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