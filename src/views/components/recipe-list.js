import React from 'react';

function checkStringEquality(searchQuery, recipeName) {
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
	.filter(recipe => checkStringEquality(props.query,recipe.name))
	.map((recipe,index) =>
		<div className="recipe-result col-6">
			<strong>{recipe.name}</strong>: {recipe.ABV}%ABV
		</div>
	);
	return (
		<div className="recipe-results-container">
			{recipes}
		</div>
	);
}

export default RecipeList;