import React, { Component } from 'react';
import './custom.sass';


class Home extends Component {
  render() {
    return (
      <div className="section">
        <div className="hero">
          <div className="hero-body">
            <p className="title is-2">Save and manage your favorite Warcraft 3 game build orders</p>
          </div>
        <div className="columns">
          <article className=" infoColumn has-text-centered column">
              <span className="icon is-large"><i className="fa fa-cloud-upload"> </i></span>
              <p className="infoText">Save your best games</p>
          </article>
          <article className=" infoColumn has-text-centered column">
              <span className="icon is-large"><i className="fa fa-question"> </i></span>
              <p className="infoText">Get help mid game during high intesity moments</p>

          </article>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;