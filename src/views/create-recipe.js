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
      		<RecipeCreator
            authToken={this.props.authToken} 
            currentUser={this.props.currentUser}
            recipeName={""}
            ingredients={2}
            visibility={["ingredient","ingredient","ingredient-hidden",
              "ingredient-hidden","ingredient-hidden","ingredient-hidden",
              "ingredient-hidden","ingredient-hidden","ingredient-hidden",
              "ingredient-hidden","ingredient-hidden","ingredient-hidden",
              "ingredient-hidden","ingredient-hidden","ingredient-hidden"]}
            ingredientsList={["","","","","","","","","","","","","","",""]}
            ingredientABV={[40,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
            parts={[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
            totalABV={20.00} />
      	</section>
      </div>
    );
  }
}

export default CreateRecipe;