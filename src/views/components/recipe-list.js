import React from 'react';

function RecipeList(props) {
	const recipes = props.recipes
	.filter(recipe => recipe.name.toLowerCase().includes(props.query))
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