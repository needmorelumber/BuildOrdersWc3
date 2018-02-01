import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import data from './../../MasterData'
import {fetchAndUpdateUser,logOut} from './../../actions/user'
class Header extends Component {
    constructor(props) {
        super(props)
    }
    
    componentWillMount() {
        this.props.fetchUser()
        // console.log(this.props)
    }
    toggleMenuMobile(){
        let navMenu = document.getElementById('navMenu');
        if(navMenu.classList.contains('is-active')){
            navMenu.classList.remove('is-active')
        }else {
            navMenu.classList.add('is-active');
        }        
    }
    
    navBarItems(){
        const navBarItems = [
            {   
                pathname: "/home",
                display: "Home"
            },
            { 
                pathname: "/builds",
                display: "Browse Builds"
            }
        ]
        return navBarItems
    }
    render() {
        const user=this.props.userState.user.user;
        return (
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                    <a className="navbar-item" href="../">
                        <img src="./../../assets/warcraft.svg" alt="Logo" className="logo" />
                        <p className="title navbar-item"> Need More Lumber? </p>    
                    </a>
                    
                    <button className="button is-dark navbar-burger" data-target="navMenu" onClick={this.toggleMenuMobile}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    </div>
                    <div id="navMenu" className="navbar-end navMenu">
                    {this.navBarItems().map((item, index) => (
                        // to "item" works because of react router object assesment for "to" prop
                        <Link className="navbar-item" key={index} to={item} >
                                {item.display}
                        </Link>
                    ))}
                    <div className="navbar-end">
                      { !user
                        ?
                        <Link to='/user/profile' className="navbar-item title is-5">NeedMoreLumber</Link>
                        :                        
                        <Link to='/user/profile' className="navbar-item title is-5"> Logged in as {user.username}</Link>
                    }
                    </div>
                    <div className="navbar-end">
                    
                        { !user
                            ?
                                <Link className="navbar-item" to={'/login'}>Login</Link>
                            :
                                <Link className="navbar-item" to={'/home'} onClick={this.props.logOut}>Logout</Link>
                        }
                    </div>
                    </div>
                </div>
            </nav>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    ...state
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => {
            dispatch(fetchAndUpdateUser())
        },
        logOut: () => {
            dispatch(logOut())
        }
    }
}
Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
export default Header;