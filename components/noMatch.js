import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class NoMatch extends Component {
  render() {
    return (
      <div className="container section content">
       <h1> Wha' is it? Page can not be found </h1>
       <Link to="/builds"> Go Back to browsing builds </Link>  
      </div>
    );
  }
}

export default NoMatch;