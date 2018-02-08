import React, {Component} from 'react';
import './browse-recipes.css';
import SearchForm from './components/search-form';
import RecipeList from './components/recipe-list';
import {API_BASE_URL} from '../config.js';
import LoadingPopup from './components/loading';

class BrowseRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      recipeData: [],
      loading: false
    };

  }

  componentWillMount() {
    this.fetchRecipeDatabase();
  }

  toggleLoadingStatus() {
    this.setState({
      loading: !this.state.loading
    });
  }

  fetchRecipeDatabase() {
    this.toggleLoadingStatus();
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
              this.toggleLoadingStatus();
              return this.setState({
                "recipeData": recipeData
              });
            })
            .catch(err => {
              this.toggleLoadingStatus();
              alert(err);
            });
  }

  render() {
    return (
      <div className="browse-container">
      		<section className="recipe-search-form-container row">
      			<SearchForm onChange={value => this.setState({searchQuery: value})} />
      		</section>
      		<section className="recipes-main-container row">
      			<div className="recipes-header col-12">
      				<h2>Recipes</h2>
      			</div>
      			 <RecipeList recipes={this.state.recipeData} query={this.state.searchQuery} />
      		</section>
          {this.state.loading ? 
            <LoadingPopup />
            : null}
      </div>
    );
  }
}

export default BrowseRecipes;