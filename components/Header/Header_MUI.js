import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// MUI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert'
import AccountCircle from '@material-ui/icons/AccountCircle';
// Data 
import data from '../../MasterData';
// Redux Actions
import { fetchAndUpdateUser, logOut } from '../../actions/user';

const styles = theme => ({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    menuLink: {
        '&:hover': {
            color: 'white'
        }
    },
    menuButton: {
      borderRadius: '5%',
      marginLeft: -12,
      marginRight: 20,
    //   '&:hover': {
    //       color: 'white',
    //       backgroundColor: 'green'
    //   }
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
  });
  
  class Header extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
          };
          this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
          this.handleMenuClose = this.handleMenuClose.bind(this);
          this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
          this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
      }
  
    handleProfileMenuOpen(event) {
      this.setState({ anchorEl: event.currentTarget });
    }
  
    handleMenuClose() {
      this.setState({ anchorEl: null });
      this.handleMobileMenuClose();
    }
  
    handleMobileMenuOpen(event) {
      this.setState({ mobileMoreAnchorEl: event.currentTarget });
    }
  
    handleMobileMenuClose() {
      this.setState({ mobileMoreAnchorEl: null });
    }

    componentWillMount() {
        // Fetch the user on load
        this.props.fetchUser();
    }
    // Return the menuitems for mui
    // Optional second arg for mobile styles
    navBarItems(classes, mobile=true) {
        // All navigation items displayed with flex
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
        return navBarItems.map((item, index) => (
            // to "item" works because of react router object assesment for "to" prop
            <Link key={item.display} onClick={() => this.closeMenu()} to={item}>
                <MenuItem className={!mobile?classes.menuButton:'null'}>
                <span className="icon"> <i className={item.iconClass} /> </span>
                    {item.display}
                </MenuItem>
            </Link>
            
            ))
      }
  
    render() {
      const { anchorEl, mobileMoreAnchorEl } = this.state;
      const { classes, userState } = this.props;
      const { user } = userState.user;
      const isMenuOpen = Boolean(anchorEl);
      const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
      // The render of mobile drop down menu
      const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={this.handleMenuClose}
        >
         {this.navBarItems(classes)}
        </Menu>
      );
      // Render of always visible user menu
      const userMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
        { !user
            ? null
            :
                <MenuItem onClick={this.handleMenuClose} to="/user/profile" component={Link}>
                    <span className="icon"> 
                        <i className="fa fa-user" /> 
                    </span>
                    Your Profile
                </MenuItem>
        }
        { !user
            ?
            <MenuItem onClick={this.handleMenuClose} to="/login" component={Link}>
                <span className="icon"> 
                    <i className="fa fa-sign-in" /> 
                </span>
                Login
            </MenuItem>
            : 
            <MenuItem onClick={this.handleMenuClose} onClick={this.props.logOut} to="/home" component={Link}>
                <span className="icon"> 
                <i className="fa fa-sign-out" />
                </span>
                Logout
            </MenuItem>
        }
        </Menu>
      );
  
      return (
        <div className={classes.root}>
          <AppBar position="sticky">
            <Toolbar>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Need More Lumber
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                {this.navBarItems(classes, false)}
              </div>
              <div className={classes.sectionMobile}>
              <IconButton 
                    aria-owns={isMobileMenuOpen ? 'material-appbar' : undefined} 
                    aria-haspopup="true" 
                    onClick={(event) => this.handleMobileMenuOpen(event)} 
                    color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
              <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={(event) => this.handleProfileMenuOpen(event)}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                {userMenu}
                {renderMobileMenu}
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }
  
  Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
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
  export default withStyles(styles)(Header);