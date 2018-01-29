import React, {Component} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import './main-navbar.css';

class MainNavBar extends Component {
  render() {
    return (
      	<div className="main-navbar-container row">
      		<div className="col-6">
      			<span>MixerHub</span>
      		</div>

      		<div className="nav-links-container col-6">
      			<ul className="nav-links">
              <li><Link to="/main">Home</Link></li>
              <li><Link to="/create">Create</Link></li>
              <li><Link to="/browse">Browse</Link></li>
              <li><Link to="/manage">Manage</Link></li>
              <li><Link to="/">Log Out</Link></li>
            </ul>
      		</div>
      	</div>
    );
  }
}

export default MainNavBar;