import React from 'react';

function checkStringEquality(searchQuery, recipeName,recipeIngredients) {
	const queryStrings = searchQuery.toLowerCase().split(" ").filter(Boolean);
	const recipeNameLowerCase = recipeName.toLowerCase();
	for (let i = 0; i < queryStrings.length; i++) {
		if (!recipeNameLowerCase.includes(queryStrings[i])) {
			return false;
		}
	}
	return true;
}

function RecipeList(props) {
	const recipes = props.recipes
	.filter(recipe => checkStringEquality(props.query,recipe.recipeName,recipe.ingredients))
	.map((recipe,index) =>
		<li key={index} className="recipe-result col-12">
			<strong>{recipe.recipeName}</strong>: {parseFloat(recipe.totalABV).toFixed(2)}% ABV<br/>
			<ul>
			{recipe.ingredients.map((ingredient,index) => 
				<li key={index}>{ingredient}</li>
			)}
			</ul>
		</li>
	);
	return (
		<div className="recipe-results-container">
			<ul className="recipe-list row">
				{recipes}
			</ul>
		</div>
	);
}

export default RecipeList;