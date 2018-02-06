import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import './components/responsivegrid.css'
import BrowseRecipes from './browse-recipes';
import CreateRecipe from './create-recipe';
import Landing from './landing';
import Main from './main';
import ManageRecipes from './manage-recipes';
import LandingNavBar from './components/landing-navbar';
import MainNavBar from './components/main-navbar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: false
    }
  }

  render() {
    return (
      <Router>
        <main>
          <Route exact path="/" component={LandingNavBar} />
          {["/browse","/create","/main","/manage"].map((path,index) =>
            <Route key={index} exact path={path} component={MainNavBar} />
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