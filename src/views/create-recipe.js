import React, {Component} from 'react';
import './create-recipe.css';
import RecipeCreator from './components/recipe-creator.js';

class CreateRecipe extends Component {
  render() {
    return (
      <div className="create-recipe-container">
            <section className="create-recipe-header-container row">
                <div className="col-12">
                    <h2 className="create-recipe-header">Create Recipe</h2>
      			</div>
      		</section>

      		<section className="recipe-form-container row">
      		<RecipeCreator />
      		</section>
      	</div>
    );
  }
}

export default CreateRecipe;