import React, {Component} from 'react';
import './browse-recipes.css';
import SearchForm from './components/search-form';
import RecipeList from './components/recipe-list';

class BrowseRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };

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
      			<RecipeList recipes={this.props.recipes} query={this.state.searchQuery} />
      		</section>
      </div>
    );
  }
}

export default BrowseRecipes;