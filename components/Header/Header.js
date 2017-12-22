import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import data from './../../MasterData'
import {fetchAndUpdateUser,logOut} from './../../actions/actions'

class Header extends Component {
    constructor(props) {
        super(props)
    }
    
    componentWillMount() {
        this.props.fetchUser()
        // console.log(this.props)
    }
    
    navBarItems(){
        const navBarItems = [
            { 
                pathname: "/builds",
                display: "Browse Builds"
            },
            {   
                pathname: "/builds",
                display: "Home"
            }
        ]
        return navBarItems
    }
    render() {
        const user=this.props.userState.user.user;
        return (
            <nav className="navbar is-primary">
                <div className="navbar-brand"> 
                    <Link className="navbar-item" to="/">
                    { !user
                        ?
                        <h1 className="title is-5">Create Warcraft Build Orders</h1>
                        :                        
                        <p className="title is-5"> Logged in as {user.username}</p>
                    }
                    </Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                    {this.navBarItems().map((item, index) => (
                        // to "item" works because of react router object assesment for "to" prop
                        <Link className="navbar-item" key={index} to={item} >
                                {item.display}
                        </Link>
                    ))}
                    </div>
                    <div className="navbar-end">
                        { !user
                            ?
                                <Link className="navbar-item" to={'/login'}>Login</Link>
                            :
                                <Link className="navbar-item" to={location.pathname} onClick={this.props.logOut}>Logout</Link>
                        }
                        { !user
                            ?
                            null
                            :
                                <Link className="navbar-item" user={user._id} to={'/builds/new'} >Create a new Build</Link>
                        } 
                        { !user
                            ?
                            null
                            :
                                <Link className="navbar-item" user={user._id} to={'/user/profile'}>Your Profile</Link>
                        }         
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