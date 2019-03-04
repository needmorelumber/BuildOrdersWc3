import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './footer.sass';


class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerLinksData:
        [
          {
            route: '/login',
            text: 'Login',
            icon: 'user',
          },
        ],
    };
  }

  returnFooterLinks() {
    return this.state.footerLinksData.map((link, i) => (
      <li className="footerItem" key={i}><span className="icon"><i className={`fa fa-${link.icon}`} /></span><Link to={link.route}>{link.text}</Link></li>
    ));
  }

  render() {
    const links = this.returnFooterLinks();
    return (
      <footer className="footer">
        <p className="footerBrand"> Need More Lumber </p>
        <ul className="footerLinks">
          {links}
          <li className="footerItem"><span className="icon"><i className="fa fa-github" /></span><a target="_blank" rel="noopener noreferrer" href="https://github.com/LJunghansCode/BuildOrdersWc3">Check out this project here</a></li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
