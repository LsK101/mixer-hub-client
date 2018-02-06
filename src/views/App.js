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
import {API_BASE_URL} from '../config.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "recipeData": []
    };
  }

  componentWillMount() {
    this.fetchRecipeDatabase();
  }

  fetchRecipeDatabase() {
    return fetch(`${API_BASE_URL}/recipes`)
            .then(res => {
              return res.json();
            })
            .then(recipeData => {
              this.setState({
                "recipeData": recipeData
              });
            });
  }

  render() {
    return (
      <Router>
        <main>
          <Route exact path="/" component={LandingNavBar} />
          {["/browse","/create","/main","/manage"].map(path =>
            <Route exact path={path} component={MainNavBar} />
          )}

          <Route exact path="/" component={Landing} />
          <Route exact path="/browse"
            render={() => <BrowseRecipes recipes={this.state.recipeData} />} />
          <Route exact path="/create" 
            render={() => <CreateRecipe reloadRecipes={this.fetchRecipeDatabase()} />} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/manage" component={ManageRecipes} />
        </main>
      </Router>
    );
  }
}

export default App;