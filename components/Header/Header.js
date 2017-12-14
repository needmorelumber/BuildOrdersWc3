import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import data from './../../MasterData'

export default class Header extends Component {
    navBarItems(){
        const navBarItems = [
            { 
                pathname: "/builds",
                display: "Browse Builds"
            },
            {   
                pathname: "/builds",
                display: "Home"
            },
            {
                pathname: "/builds/new",
                display: "Submit a new Build"
            }
        ]
        return navBarItems
    }
    render() {
        return (
            <nav className="navbar is-primary">
                <div className="navbar-brand"> 
                    <Link className="navbar-item" to="/">
                        <h1>Warcraft 3 Build Orders</h1>
                    </Link>
                </div>
                <div className="navbar-menu">
                <div className="navbar-start">
                {this.navBarItems().map((item, index) => (
                    // to "item" works because of react router object assesment for "to" prop
                    <Link className="navbar-item" key={index} to={item}>
                            {item.display}
                    </Link>
                ))}
                </div>
                </div>
            </nav>
        )
    }
}