import React, {Component} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import './landing-navbar.css';

class LandingNavBar extends Component {
  render() {
    return (
      	<div className="landing-navbar-container row">
      		<div className="col-6">
      			<span>MixerHub</span>
      		</div>

      		<div className="login-button-container col-6">
      			<button className="login-button"><Link to="/main">Login / Demo</Link></button>
      		</div>
      	</div>
    );
  }
}

export default LandingNavBar;