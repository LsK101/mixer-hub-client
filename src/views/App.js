import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';
import './components/responsivegrid.css'
import BrowseRecipes from './browse-recipes';
import CreateRecipe from './create-recipe';
import Landing from './landing';
import Main from './main';
import ManageRecipes from './manage-recipes';
import LandingNavBar from './components/landing-navbar';
import MainNavBar from './components/main-navbar';
import LoadingPopup from './components/loading';
import {API_BASE_URL} from '../config';
import SignupPopup from './components/signup-popup';

class App extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: '',
      passwordInput: '',
      authToken: null,
      currentUser: null,
      signupFirstName: '',
      signupUsername: '',
      signupPassword: '',
      signupPasswordConfirm: '',
      loading: false,
      signupPopup: false
    }
  }

  resetWindow() {
    return window.scrollTo(0,0)
  }

  toggleLoadingStatus() {
    this.setState({
      loading: !this.state.loading
    });
  }

  toggleSignupPopupOn() {
    this.setState({
      signupPopup: true
    });
    this.clearInputFields();
  }

  toggleSignupPopupOff() {
    this.setState({
      signupPopup: false
    });
    this.clearInputFields();
  }

  changeUsernameInput(value) {
    let changeValue = value
    this.setState({
      "usernameInput": changeValue
    });
  }

  changePasswordInput(value) {
    let changeValue = value
    this.setState({
      "passwordInput": changeValue
    });
  }

  changeSignupFirstNameInput(value) {
    let changeValue = value.toLowerCase().split(' ');
    for (let i = 0; i < changeValue.length; i++) {
      changeValue[i] = changeValue[i].charAt(0).toUpperCase() + changeValue[i].slice(1);
    }
    changeValue = changeValue.join(' ');
    this.setState({
      "signupFirstName": changeValue
    });
  }

  changeSignupUsernameInput(value) {
    let changeValue = value
    this.setState({
      "signupUsername": changeValue
    });
  }

  changeSignupPasswordInput(value) {
    let changeValue = value
    this.setState({
      "signupPassword": changeValue
    });
  }

  changeSignupPasswordConfirmInput(value) {
    let changeValue = value
    this.setState({
      "signupPasswordConfirm": changeValue
    });
  }

  loginWithDemoAccount() {
    this.toggleLoadingStatus();
    return fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "username": 'demo',
                  "password": 'demopassword',
                })
            }).then(res => res.json())
            .then(({authToken}) => this.storeAuthInfo(authToken))
            .then(() => this.clearInputFields())
            .catch(() => {
              this.toggleLoadingStatus();
              alert('incorrect username or password');
            });
  }

  getAuthToken() {
    this.toggleLoadingStatus();
    return fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "username": this.state.usernameInput.toLowerCase(),
                  "password": this.state.passwordInput,
                })
            }).then(res => res.json())
            .then(({authToken}) => this.storeAuthInfo(authToken))
            .then(() => this.clearInputFields())
            .catch(() => {
              this.toggleLoadingStatus();
              alert('incorrect username or password');
            });
  }

  storeAuthInfo(authToken) {
    const decodedToken = jwtDecode(authToken);
    this.setAuthToken(authToken);
    this.authSuccess(decodedToken.user);
  }

  setAuthToken(authToken) {
    this.setState({
      authToken: authToken
    });
  }

  authSuccess(user) {
    this.setState({
      currentUser: user.username
    })
  }

  sendSignupCredentials() {
    let firstName = this.state.signupFirstName;
    let username = this.state.signupUsername.toLowerCase();
    let password = this.state.signupPassword;
    let passwordConfirm = this.state.signupPasswordConfirm;
    if (!firstName) {
      return alert('Error: first name required')
    }
    if (password !== passwordConfirm) {
      return alert('Error: passwords do not match')
    }
    if (username.length < 3 || username.length > 25) {
      return alert('Error: username must be between 3 and 25 characters')
    }
    if (password.length < 10 || password.length > 72) {
      return alert('Error: password must be between 10 and 72 characters')
    }
    if (firstName !== firstName.trim() ||
        username !== username.trim() || 
        password !== password.trim()) {
      return alert('Error: inputs cannot begin or end with whitespace')
    }
    this.toggleLoadingStatus();
    fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "firstName": firstName,
        "username": username,
        "password": password
      })
    })
    .then(res => {
      if (!res.ok) {
        throw Error('username already taken');
      }
      return res;
    })
    .then(() => 
      this.setState({
        usernameInput: this.state.signupUsername,
        passwordInput: this.state.signupPassword
      })
    )
    .then(() => this.getAuthToken())
    .then(() => {
      this.setState({
        signupPopup: false
      });
    })
    .catch(err => {
      this.toggleLoadingStatus();
      alert(err);
    });
  }

  clearInputFields() {
    this.setState({
      usernameInput: '',
      passwordInput: '',
      signupFirstName: '',
      signupUsername: '',
      signupPassword: '',
      signupPasswordConfirm: '',
      loading: false
    });
  }

  logout() {
    this.setState({
      authToken: null,
      currentUser: null
    });
  }

  render() {
    this.resetWindow();
    return (
      <Router>
        <main>
          <Route exact path="/" 
            render={() => (this.state.currentUser) ?
                          (<Redirect to="/browse" />) :
                          (<LandingNavBar 
                            usernameInput={this.state.usernameInput}
                            onChangeUsername={value => this.changeUsernameInput(value)} 
                            passwordInput={this.state.passwordInput}
                            onChangePassword={value => this.changePasswordInput(value)}
                            onClick={this.getAuthToken.bind(this)}
                            demo={this.loginWithDemoAccount.bind(this)} />) } />
          <Route exact path="/" 
            render={() => (<Landing 
                            firstName={this.state.signupFirstName}
                            onChangeFirstName={value => this.changeSignupFirstNameInput(value)}
                            username={this.state.signupUsername}
                            onChangeUsername={value => this.changeSignupUsernameInput(value)}
                            password={this.state.signupPassword}
                            onChangePassword={value => this.changeSignupPasswordInput(value)} 
                            passwordConfirm={this.state.signupPasswordConfirm}
                            onChangePasswordConfirm={value => this.changeSignupPasswordConfirmInput(value)}
                            onClick={this.sendSignupCredentials.bind(this)} />) } />

          {["/browse","/create","/main","/manage"].map((path,index) =>
            <Route key={index} exact path={path} 
            render={() => <MainNavBar logout={this.logout.bind(this)} 
                            currentUser={this.state.currentUser} />} />
          )}
          <Route exact path="/browse" 
            render={() => (this.state.currentUser) ?
                          (<BrowseRecipes
                            authToken={this.state.authToken}
                            currentUser={this.state.currentUser}
                            toggleSignup={this.toggleSignupPopupOn.bind(this)} />) :
                          (<Redirect to="/" />)} />
          <Route exact path="/create" 
            render={() => (this.state.currentUser) ?
                          (<CreateRecipe
                            authToken={this.state.authToken}
                            currentUser={this.state.currentUser}
                            toggleSignup={this.toggleSignupPopupOn.bind(this)} />) :
                          (<Redirect to="/" />)} />
          <Route exact path="/main" 
            render={() => (this.state.currentUser) ?
                          (<Main 
                            authToken={this.state.authToken}
                            currentUser={this.state.currentUser}/>) :
                          (<Redirect to="/" />)} />
          <Route exact path="/manage" 
            render={() => (this.state.currentUser) ?
                          (<ManageRecipes
                            authToken={this.state.authToken}
                            currentUser={this.state.currentUser} />) :
                          (<Redirect to="/" />)} />
          {this.state.signupPopup ? 
            <SignupPopup
              firstName={this.state.signupFirstName}
              onChangeFirstName={value => this.changeSignupFirstNameInput(value)}
              username={this.state.signupUsername}
              onChangeUsername={value => this.changeSignupUsernameInput(value)}
              password={this.state.signupPassword}
              onChangePassword={value => this.changeSignupPasswordInput(value)} 
              passwordConfirm={this.state.signupPasswordConfirm}
              onChangePasswordConfirm={value => this.changeSignupPasswordConfirmInput(value)}
              onClick={this.sendSignupCredentials.bind(this)}
              cancelSignup={this.toggleSignupPopupOff.bind(this)} />
            : null}

          {this.state.loading ? 
            <LoadingPopup />
            : null}
        </main>
      </Router>
    );
  }
}

export default App;