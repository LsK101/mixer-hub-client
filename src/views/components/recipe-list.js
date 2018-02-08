import React from 'react';
import './recipe-list.css';

function checkStringEquality(searchQuery, recipeName,recipeIngredients,recipeCreator) {
	const queryStrings = searchQuery.toLowerCase().split(" ").filter(Boolean);
	const recipeNameLowerCase = recipeName.toLowerCase();
	const recipeCreatorLowerCase = recipeCreator.toLowerCase();
	const recipeIngredientsString = recipeIngredients.join(" ").toLowerCase().split(" ");
	const recipeTotalString = recipeNameLowerCase + " " + recipeCreatorLowerCase + " " + recipeIngredientsString;
	for (let i = 0; i < queryStrings.length; i++) {
		if (!recipeTotalString.includes(queryStrings[i])) {
			return false;
		}
	}
	return true;
}

function RecipeList(props) {
	const recipes = props.recipes
	.filter(recipe => checkStringEquality(props.query,recipe.recipeName,recipe.ingredients,recipe.recipeCreator))
	.map((recipe,index) =>
		<li key={index} className="recipe-result col-12">
			<strong>{recipe.recipeName}</strong>: {parseFloat(recipe.totalABV).toFixed(2)}% ABV<br/>
			<span>Created by: </span><span className="creator-label">{recipe.recipeCreator}</span><br/>
			<ul className="recipe-ingredient-list">
			{recipe.ingredients.map((ingredient,index) => 
				<li key={index} className="recipe-ingredient">{ingredient}</li>
			)}
			</ul>
		</li>
	);
	return (
		<ul className="recipe-list row">
			{recipes}
		</ul>
		
	);
}

export default RecipeList;