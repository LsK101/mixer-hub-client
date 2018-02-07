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
import {API_BASE_URL} from '../config';

class App extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: '',
      passwordInput: '',
      authToken: null,
      currentUser: null
    }
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

  getAuthToken() {
    return fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "username": this.state.usernameInput,
                  "password": this.state.passwordInput,
                })
            }).then(res => res.json())
            .then(({authToken}) => this.storeAuthInfo(authToken))
            .then(() => this.clearInputFields())
            .catch(err => alert(err));
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

  clearInputFields() {
    this.setState({
      usernameInput: '',
      passwordInput: ''
    });
  }

  logout() {
    this.setState({
      authToken: null,
      currentUser: null
    });
  }

  render() {
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
                            onClick={this.getAuthToken.bind(this)} />) } />

          {["/browse","/create","/main","/manage"].map((path,index) =>
            <Route key={index} exact path={path} 
            render={() => <MainNavBar logout={this.logout.bind(this)} />} />
          )}

          <Route exact path="/" component={Landing} />
          <Route exact path="/browse" component={BrowseRecipes} />
          <Route exact path="/create" component={CreateRecipe} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/manage" component={ManageRecipes} />
        </main>
      </Router>
    );
  }
}

export default App;