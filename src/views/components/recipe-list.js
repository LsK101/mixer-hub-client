import React, {Component} from 'react';
import './recipe-list.css';
import {API_BASE_URL} from '../../config.js';
import ReactStars from 'react-stars';
import LoadingPopup from './loading';
import ConfirmDelete from './confirm-delete';
import RecipeEditor from './recipe-editor';

class RecipeList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			recipeData: [],
			loading: false,
			recipeDeleteID: '',
			deleteRecipeConfirmation: false,
			editing: false,
			recipeToEdit: '',
			recipeName: '',
			ingredients: null,
			visibility: [],
			ingredientsList: [],
			ingredientABV: [],
			parts: [],
			totalABV: null
		}
	}

	componentWillMount() {
    	this.fetchRecipeDatabase();
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

	toggleLoadingStatus() {
    	this.setState({
      		loading: !this.state.loading
    	});
  	}

  	toggleDeleteRecipeConfirmation() {
    	this.setState({
      		deleteRecipeConfirmation: !this.state.deleteRecipeConfirmation
    	});
  	}

  	editRecipePopup(recipe) {
  		this.setState({
  			editing: true,
  			recipeToEdit: recipe.id,
  			recipeName: recipe.recipeName,
  			ingredients: recipe.ingredients,
  			visibility: recipe.visibility,
  			ingredientsList: recipe.ingredientsList,
  			ingredientABV: recipe.ingredientABV,
  			parts: recipe.parts,
  			totalABV: recipe.totalABV
  		});
  	}

  	cancelEditRecipe() {
  		this.setState({
  			editing: false
  		})
  	}

  	confirmDelete(recipeID) {
  		this.setState({
  			recipeDeleteID: recipeID
  		});
  		this.toggleDeleteRecipeConfirmation()
  	}

  	deleteRecipe() {
  		this.toggleLoadingStatus();
  		return fetch(`${API_BASE_URL}/recipes/delete`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${this.props.authToken}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"id": this.state.recipeDeleteID,
				"username": this.props.currentUser,
			})
		})
		.then((res) => {
			this.toggleLoadingStatus();
			if (res.status === 200) {
				alert('Recipe Deleted!')
			}
			this.toggleDeleteRecipeConfirmation()
			this.fetchRecipeDatabase();
		})
		.catch((err) => {
			this.toggleLoadingStatus();
			this.toggleDeleteRecipeConfirmation()
			return alert(err);
		});
  	}

	checkStringEquality(searchQuery, recipeName,recipeIngredients,recipeCreator) {
		const queryStrings = searchQuery.toLowerCase().split(" ").filter(Boolean);
		const recipeNameLowerCase = recipeName.toLowerCase();
		const recipeCreatorLowerCase = recipeCreator.toLowerCase();
		const recipeIngredientsString = recipeIngredients.join(" ").toLowerCase().split(" ");
		const recipeTotalString = recipeNameLowerCase + " " + recipeCreatorLowerCase + " " + recipeIngredientsString;
		if (this.props.manage) {
			for (let i = 0; i < queryStrings.length; i++) {
				if(recipeCreatorLowerCase !== this.props.currentUser) {
					return false;
				}
			}
		}
		for (let i = 0; i < queryStrings.length; i++) {
			if (!recipeTotalString.includes(queryStrings[i])) {
				return false;
			}
		}
	return true;
	}

	rateRecipe(recipeID,rating) {
		this.toggleLoadingStatus();
		return fetch(`${API_BASE_URL}/recipes/rate`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${this.props.authToken}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"id": recipeID,
				"username": this.props.currentUser,
				"rating": rating
			})
		})
		.then((res) => {
			this.toggleLoadingStatus();
			this.fetchRecipeDatabase();
			if (res.status === 200) {
				alert('Recipe Rated!')
			}
		})
		.catch((err) => {
			this.toggleLoadingStatus();
			return alert(err);
		});
	}

	getAverageRating(recipeRatings) {
		let runningTotal = 0;
		for (let i = 0; i < recipeRatings.length; i++) {
			runningTotal = runningTotal + recipeRatings[i].rating;
		}
		runningTotal = (runningTotal / recipeRatings.length).toFixed(2);
		if (isNaN(runningTotal)) {
			return 'No Rating'
		}
		return runningTotal;
	}

	checkIfUserRatedRecipe(recipeRatings) {
		for (let i = 0; i < recipeRatings.length; i++) {
			if (recipeRatings[i].username === this.props.currentUser) {
				return recipeRatings[i].rating.toFixed(1);
			}
		}
		return 'No Rating';
	}

	render() {
	const recipes = this.state.recipeData
	.filter(recipe => this.checkStringEquality(this.props.query,recipe.recipeName,recipe.ingredientsString,recipe.recipeCreator))
	.map((recipe,index) => {
		let userRated = this.checkIfUserRatedRecipe(recipe.userRatings);
		let averageRecipeRating = this.getAverageRating(recipe.userRatings);
		let userRecipe;
		if (recipe.recipeCreator === this.props.currentUser) {
			userRecipe = true;
		}
		else {
			userRecipe = false;
		}
		let manageMode = this.props.manage;
		return (
			<li key={index} className="recipe-result col-12">
				{userRecipe && manageMode ?
					<div>
						<button className="edit-button" onClick={this.editRecipePopup.bind(this,recipe)}>Edit</button>
						<button className="delete-button" onClick={this.confirmDelete.bind(this,recipe.id)}>Delete</button> 
					</div>:
					null}
				<strong>{recipe.recipeName}</strong><span> ({parseFloat(recipe.totalABV).toFixed(2)}% ABV)</span><br/>
				{manageMode ?
					null :
				<div>
				<span>Mixed by: </span><span className="creator-label">{recipe.recipeCreator}</span><br/>
				<span className="user-rating-label">User Rating: </span>
					<ReactStars 
						className={"rating-stars"}
						count={5}
						value={averageRecipeRating}
						color1={"black"}
						color2={"red"}
						size={25}
						edit={false} 
						half={true} />
				<span className="user-rating-number">
					{averageRecipeRating}
					{recipe.userRatings.length > 0 ?
						`(${recipe.userRatings.length})` :
						null}
				</span><br/>
				{this.props.currentUser !== recipe.recipeCreator ?
				<div>
					<span className="user-rating-label">Your Rating: </span>
						<ReactStars 
							className={"rating-stars"}
							count={5}
							value={userRated}
							color1={"black"}
							color2={"red"}
							size={25}
							edit={true} 
							half={true} 
							onChange={(value) => this.rateRecipe(recipe.id,value)} />
					<span className="user-rating-number">
						{userRated}
					</span> 
				</div> :
				null
				}
				</div>
				}

				<ul className="recipe-ingredient-list">
				{recipe.ingredientsString.map((ingredient,index) => 
					<li key={index} className="recipe-ingredient">{ingredient}</li>
				)}
				</ul>
			</li>
		)
	});
	return (
		<div>
			<ul className="recipe-list row">
				{recipes}
			</ul>

			{this.state.loading ? 
            <LoadingPopup />
            : null}

            {this.state.deleteRecipeConfirmation ? 
            <ConfirmDelete 
            	delete={this.deleteRecipe.bind(this)} 
            	cancel={this.toggleDeleteRecipeConfirmation.bind(this)} />
            : null}

            {this.state.editing ?
				<div className="recipe-editor-popup">
					<div className="recipe-editor-popup-inner">
            			<RecipeEditor 
            				cancel={this.cancelEditRecipe.bind(this)}
            				authToken={this.props.authToken}
            				recipeID={this.state.recipeToEdit}
            				currentUser={this.props.currentUser}
            				recipeName={this.state.recipeName}
            				ingredients={this.state.ingredients}
            				visibility={this.state.visibility}
            				ingredientsList={this.state.ingredientsList}
            				ingredientABV={this.state.ingredientABV}
            				parts={this.state.parts}
            				totalABV={this.state.totalABV}
            				reload={this.fetchRecipeDatabase.bind(this)} />
            		</div>
            	</div>
            	: null}
		</div>
	);
	}
}

export default RecipeList;