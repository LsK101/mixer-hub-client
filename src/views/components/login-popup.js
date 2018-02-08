import React, {Component} from 'react';
import './login-popup.css';

class LoginPopup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup-inner row">
        <form onSubmit={e => e.preventDefault()}>
          <div className="username-container">
				    <label htmlFor="login-username">Username</label>
				    <input id="login-username" className="login-form-input" type="text" 
              value={this.props.usernameInput} 
              onChange={e => this.props.onChangeUsername(e.target.value)} required />
          </div>
			     <div className="password-container">
				    <label htmlFor="login-password">Password</label>
				    <input id="login-password" className="login-form-input" type="password" 
              value={this.props.passwordInput} 
              onChange={e => this.props.onChangePassword(e.target.value)} required />
			     </div>
          <div className="login-form-button-container">
				    <button type="submit" className="login-form-button" onClick={this.props.onClick}>Log In</button>
        		<button className="cancel-button" onClick={this.props.closePopup}>Cancel</button>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPopup;