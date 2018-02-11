import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
              {this.props.currentUser === 'demo' ?
              null :
              <li><Link to="/manage">Manage Recipes</Link></li>}
              {this.props.currentUser === 'demo' ?
              <li><Link to="/" onClick={this.props.logout}>Back To Home</Link></li> :
              <li><Link to="/" onClick={this.props.logout}>Log Out</Link></li>}
            </ul>
      		</div>
      	</div>
    );
  }
}

export default MainNavBar;