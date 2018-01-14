import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './footer.sass';


class Footer extends Component {
  constructor(props){
      super(props)
      this.state={
        footerLinksData:
        [
          {
            route:"/home",
            text:"Home"
          },
          {
            route:"/login",
            text:"Login"
          },
          {
            route:"/register",
            text:"Register"
          }
        ]
      }
    }
  returnFooterLinks(){
     return this.state.footerLinksData.map((link, i) => (
        <li key={i}><Link to={link.route}>{link.text}</Link></li>
      ))
  }
  render() {
    const links=this.returnFooterLinks();
    return (
      <footer className="footer">
        Need More Lumber
        <ul className="footerLinks">
          {links}
        </ul>
      </footer>
    );
  }
}

export default Footer;