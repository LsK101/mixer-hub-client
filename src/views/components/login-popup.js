import React, {Component} from 'react';
import './login-popup.css';

class LoginPopup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner row">
        	<div className="username-container">
				<label for="login-username">Username</label>
				<input id="login-username" className="login-form-input" type="text" required />
			</div>
			<div className="password-container">
				<label for="login-password">Password</label>
				<input id="login-password" className="login-form-input" type="password" required />
			</div>
			<div className="login-form-button-container">
				<button type="submit" className="login-form-button">Log In</button>
        		<button className="cancel-button" onClick={this.props.closePopup}>Cancel</button>
        	</div>
        </div>
      </div>
    );
  }
}

export default LoginPopup;