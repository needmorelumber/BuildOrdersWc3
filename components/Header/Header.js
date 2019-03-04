import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/slide';
import data from '../../MasterData';
import { fetchAndUpdateUser, logOut } from '../../actions/user';
import './header.sass';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  componentWillMount() {
    this.props.fetchUser();
    // console.log(this.props)
  }

  navBarItems() {
    const navBarItems = [
      {
        pathname: '/home',
        display: 'Home',
        iconClass: 'fa fa-home',
      },
      {
        pathname: '/builds',
        display: 'Browse Builds',
        iconClass: 'fa fa-list',
      },
    ];
    return navBarItems;
  }

  render() {
    const { user } = this.props.userState.user;
    return (
      <div>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
        >
          {this.navBarItems().map((item, index) => (
            // to "item" works because of react router object assesment for "to" prop
            <Link className="navItem" onClick={() => this.closeMenu()} key={index} to={item}>
              <span className="icon"> <i className={item.iconClass} /> </span>
              {item.display}
            </Link>
          ))}
          { !user
            ? null
            : <Link onClick={() => this.closeMenu()} to="/user/profile" className="navItem"><span className="icon"> <i className="fa fa-user" /> </span>Your Profile</Link>
                    }
          { !user
            ? <Link onClick={() => this.closeMenu()} className="navItem" to="/login"> <span className="icon"> <i className="fa fa-sign-in" /> </span> Login</Link>
            : <Link onClick={() => this.closeMenu()} className="navItem" to="/home" onClick={this.props.logOut}><span className="icon"> <i className="fa fa-sign-out" /> </span>Logout</Link>
                        }
        </Menu>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = dispatch => ({
  fetchUser: () => {
    dispatch(fetchAndUpdateUser());
  },
  logOut: () => {
    dispatch(logOut());
  },
});
Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
export default Header;
