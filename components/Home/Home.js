import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.sass';

class Home extends Component {
  render() {
    return (
      <div className="hero is-fullheight mainHero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered mainHomeContainer">
              <div className="column is-6 is-offset-1">
                <h1 className="title mainTitle">
                 Need More Lumber
                </h1>
                <hr />
                <hr />
                <h2 className="subtitle has-text-centered">
                  Be your own warcraft 3 commander with orders every second,
                  just create a build, then run it in real time during the game!
                  Never miss the next unit to build!
                </h2>
                <br />
                <p className="">
                  <Link className="button is-info buildsButton" to="/builds">
                    Check out all the builds
                  </Link>
                  <Link className="button is-primary buildsButton" to="/register">
                    Get registered and create
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <div className="container has-text-centered">
            <p className="control">
              <a className="button" href="https://github.com/LJunghansCode/BuildOrdersWc3" target="_blank" rel="noopener">
                <span className="icon is-small">
                  <i className="fa fa-github" />
                </span>
                <span>Check out the project</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
