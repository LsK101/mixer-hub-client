import React, {Component} from 'react';
import './navbar.css';

class NavBar extends Component {
  render() {
    return (
      	<div className="navbar-container row">
      		<div className="col-6">
      			<span>MixerHub</span>
      		</div>

      		<div className="login-button-container col-6">
      			<button className="login-button">Login / Demo</button>
      		</div>
      	</div>
    );
  }
}

export default NavBar;