import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './main-navbar.css';

class MainNavBar extends Component {
  render() {
    return (
      	<div className="main-navbar-container">
      		<div className="nav-links-container col-12">
      			<ul className="nav-links">
              <li><Link to="/main" className="nav-link">Dashboard</Link></li>
              <li><Link to="/create" className="nav-link">Create Recipe</Link></li>
              <li><Link to="/browse" className="nav-link">Browse Recipes</Link></li>
              {this.props.currentUser === 'demo' ?
              null :
              <li><Link to="/manage" className="nav-link">Manage Recipes</Link></li>}
              {this.props.currentUser === 'demo' ?
              <li><Link to="/" className="nav-link" onClick={this.props.logout}>Back To Home</Link></li> :
              <li><Link to="/" className="nav-link" onClick={this.props.logout}>Log Out</Link></li>}
            </ul>
      		</div>
      	</div>
    );
  }
}

export default MainNavBar;