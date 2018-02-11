import React, {Component} from 'react';
import '../landing.css';
import './signup-popup.css';

class SignupPopup extends Component {
  render() {
    return (
      <div className="signup-popup">
        <div className="signup-popup-inner">
              <h1 className="form-header">Start Mixing!</h1>

              <form className="signup-form" onSubmit={e => e.preventDefault()}>
              <label htmlFor="signup-firstname">First Name</label>
              <br/>
              <input id="signup-firstname" className="signup-firstname input-box" type="text" 
                value={this.props.firstName} 
                onChange={e => this.props.onChangeFirstName(e.target.value)} />
              <br/><br/>
              <label htmlFor="signup-username">Username (3-25 Characters)</label>
              <br/>
              <input id="signup-username" className="signup-username input-box" type="text" 
                value={this.props.username} 
                onChange={e => this.props.onChangeUsername(e.target.value)} />
              <br/><br/>
              <label htmlFor="signup-password">Password (10-72 Characters)</label>
              <br/>
              <input id="signup-password" className="signup-password input-box" type="password" 
                value={this.props.password}
                onChange={e => this.props.onChangePassword(e.target.value)} />
              <br/><br/>
              <label htmlFor="confirm-password">Confirm Password</label>
              <br/>
              <input id="confirm-password" className="confirm-password input-box" type="password" 
                value={this.props.passwordConfirm}
                onChange={e => this.props.onChangePasswordConfirm(e.target.value)} />
              <br/><br/>
              <button type="submit" className="form-signup-button" onClick={this.props.onClick.bind(this)}>Sign Up</button>
              <button className="signup-cancel-button" onClick={this.props.cancelSignup}>Cancel</button>
              </form>
        </div>
      </div>
    );
  }
}

export default SignupPopup;