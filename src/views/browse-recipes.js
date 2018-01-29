import React, {Component} from 'react';
import './browse-recipes.css';

class BrowseRecipes extends Component {
  render() {
    return (
      <div className="browse-container">
      		<section className="recipe-search-form-container row">
      			<div className="search-form col-12">
      				<span>search form here</span>
      			</div>
      		</section>

      		<section className="recipes-container row">
      			<div className="recipes-header col-12">
      				<h2>Recipes</h2>
      			</div>
      			<div className="recipe-result col-6">
      				<p>recipe 1</p>
      			</div>
      			<div className="recipe-result col-6">
      				<p>recipe 2</p>
      			</div>
      			<div className="recipe-result col-6">
      				<p>recipe 3</p>
      			</div>
      			<div className="recipe-result col-6">
      				<p>recipe 4</p>
      			</div>
      		</section>
      	</div>
    );
  }
}

export default BrowseRecipes;