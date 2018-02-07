import React, {Component} from 'react';
import './landing-navbar.css';
import LoginPopup from './login-popup';

class LandingNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
    };
  }

  toggleLoginPopup() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  render() {
    return (
      	<div className="landing-navbar-container row">
      		<div className="navbar-header-container col-6">
      			<span>MixerHub</span>
      		</div>

      		<div className="login-button-container col-6">
      			<button onClick={this.toggleLoginPopup.bind(this)}>Log In</button>
      		</div>
          {this.state.showLogin ? 
            <LoginPopup closePopup={this.toggleLoginPopup.bind(this)} 
              usernameInput={this.props.usernameInput}
              onChangeUsername={value => this.props.onChangeUsername(value)} 
              passwordInput={this.props.passwordInput}
              onChangePassword={value => this.props.onChangePassword(value)}
              onClick={this.props.onClick} /> 
            : null}
      	</div>
    );
  }
}

export default LandingNavBar;