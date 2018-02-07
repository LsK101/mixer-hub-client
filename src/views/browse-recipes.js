import React, {Component} from 'react';
import './browse-recipes.css';
import SearchForm from './components/search-form';
import RecipeList from './components/recipe-list';
import {API_BASE_URL} from '../config.js';

class BrowseRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      recipeData: []
    };

  }

  componentWillMount() {
    this.fetchRecipeDatabase();
  }

  fetchRecipeDatabase() {
    return fetch(`${API_BASE_URL}/recipes`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${this.props.authToken}`
              }
            })
            .then(res => {
              return res.json();
            })
            .then(recipeData => {
              return this.setState({
                "recipeData": recipeData
              });
            })
            .catch(err => alert(err));
  }

  render() {
    return (
      <div className="browse-container">
      		<section className="recipe-search-form-container row">
      			<SearchForm onChange={value => this.setState({searchQuery: value})} />
      		</section>
      		<section className="recipes-main-container">
      			<div className="recipes-header col-12">
      				<h2>Recipes</h2>
      			</div>
      			 <RecipeList recipes={this.state.recipeData} query={this.state.searchQuery} />
      		</section>
      </div>
    );
  }
}

export default BrowseRecipes;