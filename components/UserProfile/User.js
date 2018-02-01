import React, { Component } from 'react';
import {Redirect,Link} from 'react-router-dom';
import LoadingPlaceholder from './../loadingAnimation'


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
          <Link  key={index} to={'/build/' + build._id}>
           <article className="post">
                        <h4>{build.name}</h4>
                        <div className="media">
                        <div className="media-left">
                        </div>
                        <div className="media-content">
                            <div className="content">
                            <p>
                                <span className="tag">{build.race}</span>
                                <span className="tag">{build.build_type}</span>
                            </p>
                            </div>
                        </div>
                        </div>
                    </article>
          </Link>
        )
      })
    }
    // render the main user page
      return (
        <div>
          {
            !this.props.userState.user.user
            ? 
              <LoadingPlaceholder />
            :
            <div className="pageContainer columns">
              <div className="column is-half">
                <p className="title is-4">{this.props.userState.user.user.username}'s Builds</p>
                {builds}
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