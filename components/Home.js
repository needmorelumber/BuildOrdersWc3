import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {callLambda} from './../actions/user'
import './custom.sass';

class Home extends Component {
  render() {
    return (
      <div className="hero is-fullheight mainHero">
      
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered mainHomeContainer">
              <div className="column is-6 is-offset-1">
                <h1 className="title mainTitle">
                  Time to shine
                </h1>
                <hr/> 
                <h2 className="subtitle is-4">
                  Be your own warcraft 3 commander with orders every second
                </h2>
                <br/>
                <p className="has-text-centered">
                  <Link className="button is-dark is-outlined buildsButton" to="/builds">
                    Check out all the builds
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <div className="container">
            <div className="tabs is-centered">
              <ul>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/LJunghansCode/BuildOrdersWc3">Check out this project here</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;