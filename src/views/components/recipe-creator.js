import React, {Component} from 'react';
import './recipe-creator.css';
import NumberInput from './number-input';
import OutputValue from './output-value';
import IngredientListElement from './recipe-creator-ingredient-li';
import TextInput from './text-input';
import Button from './button';
import {API_BASE_URL} from '../../config.js'
import LoadingPopup from './loading';

class RecipeCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"recipeName": this.props.recipeName,
			"ingredients": this.props.ingredients,
			"visibility": this.props.visibility,
			"ingredientsList": this.props.ingredientsList,
			"ingredientABV": this.props.ingredientABV,
			"parts": this.props.parts,
			"totalABV": this.props.totalABV,
			"loading": false
		};
	}

	toggleLoadingStatus() {
    	this.setState({
      		loading: !this.state.loading
    	});
  	}

	submitRecipe() {
		let recipeCreator = this.props.currentUser;
		let recipeName = this.state.recipeName;
		let ingredients = this.state.ingredients;
		let visibility = this.state.visibility;
		let ingredientsList = [];
		let ingredientABV = [];
		let parts = [];
		let totalABV = this.state.totalABV;
		if (this.props.currentUser === 'demo') {
			return this.props.toggleSignup();
		}
		if (recipeName === '') {
			return alert('recipe name required');
		}
		if (ingredients < 2) {
			return alert('must be at least 2 ingredients');
		}
		if (ingredients > 15) {
			return alert('must be at most 15 ingredients');
		}
		for (let i = 0; i < ingredients; i++) {
			ingredientsList.push(this.state.ingredientsList[i]);
			ingredientABV.push(this.state.ingredientABV[i]);
			parts.push(this.state.parts[i]);
		}
		this.toggleLoadingStatus();
		fetch(`${API_BASE_URL}/recipes/add`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${this.props.authToken}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"recipeName": recipeName,
				"recipeCreator": recipeCreator,
				"ingredients": ingredients,
				"visibility": visibility,
				"ingredientsList": ingredientsList,
				"ingredientABV": ingredientABV,
				"parts": parts,
				"totalABV": totalABV
			})
		})
		.then((res) => {
			if (res.status === 200) {
				this.toggleLoadingStatus();
				this.setState({
					"recipeName": "",
					"ingredients": 2,
					"visibility": ["ingredient","ingredient","ingredient-hidden",
								"ingredient-hidden","ingredient-hidden","ingredient-hidden",
								"ingredient-hidden","ingredient-hidden","ingredient-hidden",
								"ingredient-hidden","ingredient-hidden","ingredient-hidden",
								"ingredient-hidden","ingredient-hidden","ingredient-hidden"],
					"ingredientsList": ["","","","","","","","","","","","","","",""],
					"ingredientABV": [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					"parts": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					"totalABV": 20.00
				});
				return alert('Recipe Created!')
			}
		})
		.catch((err) => {
			this.toggleLoadingStatus();
			return alert(err);
		});
	}

	changeRecipeName(value) {
		let changeValue = value
		this.setState({
			"recipeName": changeValue
		});
	}

	changeNumberOfIngredients(value) {
		let changeValue = parseInt(value,10);
		this.setState({
			"ingredients": changeValue
		});
		this.setIngredientVisibility(changeValue);
		this.getTotalABV(value);
	}

	setIngredientVisibility(value) {
		let newVisibilityArray = [];
		for (let i = 0; i < 15; i++) {
			if (i < value) {
				newVisibilityArray.push("ingredient");
			}
			else {
				newVisibilityArray.push("ingredient-hidden");
			}
		}
		this.setState({
			"visibility": newVisibilityArray
		});
	}

	changeIngredient(value,index) {
		let stateArray = this.state.ingredientsList;
		let changeValue = value.toLowerCase().split(' ');
		for (let i = 0; i < changeValue.length; i++) {
			changeValue[i] = changeValue[i].charAt(0).toUpperCase() + changeValue[i].slice(1);
		}
		changeValue = changeValue.join(' ');
		let changeIndex = parseInt(index,10);
		stateArray[changeIndex] = changeValue;
		this.setState({
			"ingredientsList": stateArray
		});
	}

	changeABV(value,index) {
		let stateArray = this.state.ingredientABV;
		let changeValue = parseFloat(value);
		let changeIndex = parseInt(index,10);
		stateArray[changeIndex] = changeValue;
		this.setState({
			"ingredientABV": stateArray
		});
		this.getTotalABV(this.state.ingredients);
	}

	changeParts(value,index) {
		let stateArray = this.state.parts;
		let changeValue = parseFloat(value);
		let changeIndex = parseInt(index,10);
		stateArray[changeIndex] = changeValue;
		this.setState({
			"parts": stateArray
		});
		this.getTotalABV(this.state.ingredients);
	}

	getTotalABV(ingredients) {
		let mixtureAlcohol = this.getTotalAlcohol(ingredients);
		let totalParts = this.getTotalParts(ingredients);
		let totalABV = (mixtureAlcohol / totalParts);
		this.setState({
			"totalABV": totalABV
		});
	}

	getTotalAlcohol(ingredients) {
		let totalAlcohol = 0;
		let alcohol;
		for (let i = 0; i < ingredients; i++) {
			alcohol = this.state.ingredientABV[i] * this.state.parts[i];
			totalAlcohol = totalAlcohol + alcohol;
		}
		return totalAlcohol;
	}

	getTotalParts(ingredients) {
		let runningTotal = 0;
		let partsSingle;
		for (let i = 0; i < ingredients; i++) {
			partsSingle = this.state.parts[i];
			runningTotal = runningTotal + partsSingle;
		}
		return runningTotal;
	}

	render() {
		return (
			<div>
				<span>Recipe Name: </span>
				<TextInput value={this.state.recipeName}
					divClassName={"recipe-name-input"}
					onChange={value => this.changeRecipeName(value)} />
				<br/>
				<span>Ingredients (2-15): </span>
				<NumberInput min={2} max={15} value={this.state.ingredients}
					divClassName={"number-of-ingredients-input"}
					onChange={value => this.changeNumberOfIngredients(value)} />
				<br/>
				<span>Total ABV: </span>
				<OutputValue value={this.state.totalABV.toFixed(2)} className="abv-display" />%

				<ul className="ingredient-list">
					<IngredientListElement className={this.state.visibility[0]}
						valueIngredient={this.state.ingredientsList[0]}
						onChangeIngredient={value => this.changeIngredient(value,0)}
						valueABV={this.state.ingredientABV[0]}
						onChangeABV={value => this.changeABV(value,0)}
						valueParts={this.state.parts[0]}
						onChangeParts={value => this.changeParts(value,0)} />
					<IngredientListElement className={this.state.visibility[1]}
						valueIngredient={this.state.ingredientsList[1]}
						onChangeIngredient={value => this.changeIngredient(value,1)}
						valueABV={this.state.ingredientABV[1]}
						onChangeABV={value => this.changeABV(value,1)}
						valueParts={this.state.parts[1]}
						onChangeParts={value => this.changeParts(value,1)} />
					<IngredientListElement className={this.state.visibility[2]}
						valueIngredient={this.state.ingredientsList[2]}
						onChangeIngredient={value => this.changeIngredient(value,2)}
						valueABV={this.state.ingredientABV[2]}
						onChangeABV={value => this.changeABV(value,2)}
						valueParts={this.state.parts[2]}
						onChangeParts={value => this.changeParts(value,2)} />
					<IngredientListElement className={this.state.visibility[3]}
						valueIngredient={this.state.ingredientsList[3]}
						onChangeIngredient={value => this.changeIngredient(value,3)}
						valueABV={this.state.ingredientABV[3]}
						onChangeABV={value => this.changeABV(value,3)}
						valueParts={this.state.parts[3]}
						onChangeParts={value => this.changeParts(value,3)} />
					<IngredientListElement className={this.state.visibility[4]}
						valueIngredient={this.state.ingredientsList[4]}
						onChangeIngredient={value => this.changeIngredient(value,4)}
						valueABV={this.state.ingredientABV[4]}
						onChangeABV={value => this.changeABV(value,4)}
						valueParts={this.state.parts[4]}
						onChangeParts={value => this.changeParts(value,4)} />
					<IngredientListElement className={this.state.visibility[5]}
						valueIngredient={this.state.ingredientsList[5]}
						onChangeIngredient={value => this.changeIngredient(value,5)}
						valueABV={this.state.ingredientABV[5]}
						onChangeABV={value => this.changeABV(value,5)}
						valueParts={this.state.parts[5]}
						onChangeParts={value => this.changeParts(value,5)} />
					<IngredientListElement className={this.state.visibility[6]}
						valueIngredient={this.state.ingredientsList[6]}
						onChangeIngredient={value => this.changeIngredient(value,6)}
						valueABV={this.state.ingredientABV[6]}
						onChangeABV={value => this.changeABV(value,6)}
						valueParts={this.state.parts[6]}
						onChangeParts={value => this.changeParts(value,6)} />
					<IngredientListElement className={this.state.visibility[7]}
						valueIngredient={this.state.ingredientsList[7]}
						onChangeIngredient={value => this.changeIngredient(value,7)}
						valueABV={this.state.ingredientABV[7]}
						onChangeABV={value => this.changeABV(value,7)}
						valueParts={this.state.parts[7]}
						onChangeParts={value => this.changeParts(value,7)} />
					<IngredientListElement className={this.state.visibility[8]}
						valueIngredient={this.state.ingredientsList[8]}
						onChangeIngredient={value => this.changeIngredient(value,8)}
						valueABV={this.state.ingredientABV[8]}
						onChangeABV={value => this.changeABV(value,8)}
						valueParts={this.state.parts[8]}
						onChangeParts={value => this.changeParts(value,8)} />
					<IngredientListElement className={this.state.visibility[9]}
						valueIngredient={this.state.ingredientsList[9]}
						onChangeIngredient={value => this.changeIngredient(value,9)}
						valueABV={this.state.ingredientABV[9]}
						onChangeABV={value => this.changeABV(value,9)}
						valueParts={this.state.parts[9]}
						onChangeParts={value => this.changeParts(value,9)} />
					<IngredientListElement className={this.state.visibility[10]}
						valueIngredient={this.state.ingredientsList[10]}
						onChangeIngredient={value => this.changeIngredient(value,10)}
						valueABV={this.state.ingredientABV[10]}
						onChangeABV={value => this.changeABV(value,10)}
						valueParts={this.state.parts[10]}
						onChangeParts={value => this.changeParts(value,10)} />
					<IngredientListElement className={this.state.visibility[11]}
						valueIngredient={this.state.ingredientsList[11]}
						onChangeIngredient={value => this.changeIngredient(value,11)}
						valueABV={this.state.ingredientABV[11]}
						onChangeABV={value => this.changeABV(value,11)}
						valueParts={this.state.parts[11]}
						onChangeParts={value => this.changeParts(value,11)} />
					<IngredientListElement className={this.state.visibility[12]}
						valueIngredient={this.state.ingredientsList[12]}
						onChangeIngredient={value => this.changeIngredient(value,12)}
						valueABV={this.state.ingredientABV[12]}
						onChangeABV={value => this.changeABV(value,12)}
						valueParts={this.state.parts[12]}
						onChangeParts={value => this.changeParts(value,12)} />
					<IngredientListElement className={this.state.visibility[13]}
						valueIngredient={this.state.ingredientsList[13]}
						onChangeIngredient={value => this.changeIngredient(value,13)}
						valueABV={this.state.ingredientABV[13]}
						onChangeABV={value => this.changeABV(value,13)}
						valueParts={this.state.parts[13]}
						onChangeParts={value => this.changeParts(value,13)} />
					<IngredientListElement className={this.state.visibility[14]}
						valueIngredient={this.state.ingredientsList[14]}
						onChangeIngredient={value => this.changeIngredient(value,14)}
						valueABV={this.state.ingredientABV[14]}
						onChangeABV={value => this.changeABV(value,14)}
						valueParts={this.state.parts[14]}
						onChangeParts={value => this.changeParts(value,14)} />
				</ul>
				<Button value="Submit" divClassName="recipe-submit-button-container" className="recipe-submit-button" 
					onClick={() => this.submitRecipe()} />

				{this.state.loading ? 
            		<LoadingPopup />
            		: null}
			</div>
		);
	}
}

export default RecipeCreator;