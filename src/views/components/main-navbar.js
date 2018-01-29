import React, {Component} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import './main-navbar.css';

class MainNavBar extends Component {
  render() {
    return (
      	<div className="main-navbar-container row">
      		<div className="nav-links-container col-12">
      			<ul className="nav-links">
              <li><Link to="/main">Dashboard</Link></li>
              <li><Link to="/create">Create Recipe</Link></li>
              <li><Link to="/browse">Browse Recipes</Link></li>
              <li><Link to="/manage">Manage Recipes</Link></li>
              <li><Link to="/">Log Out</Link></li>
            </ul>
      		</div>
      	</div>
    );
  }
}

export default MainNavBar;