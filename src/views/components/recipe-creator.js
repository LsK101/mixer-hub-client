import React, {Component} from 'react';
import './recipe-creator.css';
import NumberInput from './number-input';
import OutputValue from './output-value';
import IngredientListElement from './recipe-creator-ingredient-li';

class RecipeCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"ingredients": 2,
			"visibility": ["ingredient","ingredient","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden"],
			"ingredientABV": [40,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			"parts": [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0]
		};
	}

	changeNumberOfIngredients(value) {
		let changeValue = parseInt(value,10);
		this.setState({
			"ingredients": changeValue
		});
		this.setIngredientVisibility(changeValue);
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

	changeABV(value,index) {
		let stateArray = this.state.ingredientABV;
		let changeValue = parseFloat(value);
		let changeIndex = parseInt(index,10);
		stateArray[changeIndex] = changeValue;
		this.setState({
			"ingredientABV": stateArray
		});
	}

	changeParts(value,index) {
		let stateArray = this.state.parts;
		let changeValue = parseFloat(value);
		let changeIndex = parseInt(index,10);
		stateArray[changeIndex] = changeValue;
		this.setState({
			"parts": stateArray
		});
	}

	getTotalAlcohol(ingredientABV,parts) {
		let totalAlcohol = 0;
		let alcohol;
		for (let i = 0; i < this.state.ingredients; i++) {
			alcohol = ingredientABV[i] * parts[i];
			totalAlcohol = totalAlcohol + alcohol;
		}
		return totalAlcohol;
	}

	getTotalParts(parts) {
		let runningTotal = 0;
		let partsSingle;
		for (let i = 0; i < this.state.ingredients; i++) {
			partsSingle = parts[i];
			runningTotal = runningTotal + partsSingle;
		}
		return runningTotal;
	}

	render() {
		let totalParts = this.getTotalParts(this.state.parts);
		let mixtureAlcohol = this.getTotalAlcohol(this.state.ingredientABV,this.state.parts);
		let ABV = (mixtureAlcohol / totalParts).toFixed(2);
		return (
			<div>
				<span>Ingredients: </span>
				<NumberInput min={2} max={15} value={this.state.ingredients}
					divClassName={"number-of-ingredients-input"}
					onChange={value => this.changeNumberOfIngredients(value)} />
				<br/>
				<span>Total ABV: </span><OutputValue value={ABV} className="abv-display" />%

				<ul className="ingredient-list">
					<IngredientListElement className={this.state.visibility[0]}
						valueABV={this.state.ingredientABV[0]}
						onChangeABV={value => this.changeABV(value,0)}
						valueParts={this.state.parts[0]}
						onChangeParts={value => this.changeParts(value,0)} />
					<IngredientListElement className={this.state.visibility[1]}
						valueABV={this.state.ingredientABV[1]}
						onChangeABV={value => this.changeABV(value,1)}
						valueParts={this.state.parts[1]}
						onChangeParts={value => this.changeParts(value,1)} />
					<IngredientListElement className={this.state.visibility[2]}
						valueABV={this.state.ingredientABV[2]}
						onChangeABV={value => this.changeABV(value,2)}
						valueParts={this.state.parts[2]}
						onChangeParts={value => this.changeParts(value,2)} />
					<IngredientListElement className={this.state.visibility[3]}
						valueABV={this.state.ingredientABV[3]}
						onChangeABV={value => this.changeABV(value,3)}
						valueParts={this.state.parts[3]}
						onChangeParts={value => this.changeParts(value,3)} />
					<IngredientListElement className={this.state.visibility[4]}
						valueABV={this.state.ingredientABV[4]}
						onChangeABV={value => this.changeABV(value,4)}
						valueParts={this.state.parts[4]}
						onChangeParts={value => this.changeParts(value,4)} />
					<IngredientListElement className={this.state.visibility[5]}
						valueABV={this.state.ingredientABV[5]}
						onChangeABV={value => this.changeABV(value,5)}
						valueParts={this.state.parts[5]}
						onChangeParts={value => this.changeParts(value,5)} />
					<IngredientListElement className={this.state.visibility[6]}
						valueABV={this.state.ingredientABV[6]}
						onChangeABV={value => this.changeABV(value,6)}
						valueParts={this.state.parts[6]}
						onChangeParts={value => this.changeParts(value,6)} />
					<IngredientListElement className={this.state.visibility[7]}
						valueABV={this.state.ingredientABV[7]}
						onChangeABV={value => this.changeABV(value,7)}
						valueParts={this.state.parts[7]}
						onChangeParts={value => this.changeParts(value,7)} />
					<IngredientListElement className={this.state.visibility[8]}
						valueABV={this.state.ingredientABV[8]}
						onChangeABV={value => this.changeABV(value,8)}
						valueParts={this.state.parts[8]}
						onChangeParts={value => this.changeParts(value,8)} />
					<IngredientListElement className={this.state.visibility[9]}
						valueABV={this.state.ingredientABV[9]}
						onChangeABV={value => this.changeABV(value,9)}
						valueParts={this.state.parts[9]}
						onChangeParts={value => this.changeParts(value,9)} />
					<IngredientListElement className={this.state.visibility[10]}
						valueABV={this.state.ingredientABV[10]}
						onChangeABV={value => this.changeABV(value,10)}
						valueParts={this.state.parts[10]}
						onChangeParts={value => this.changeParts(value,10)} />
					<IngredientListElement className={this.state.visibility[11]}
						valueABV={this.state.ingredientABV[11]}
						onChangeABV={value => this.changeABV(value,11)}
						valueParts={this.state.parts[11]}
						onChangeParts={value => this.changeParts(value,11)} />
					<IngredientListElement className={this.state.visibility[12]}
						valueABV={this.state.ingredientABV[12]}
						onChangeABV={value => this.changeABV(value,12)}
						valueParts={this.state.parts[12]}
						onChangeParts={value => this.changeParts(value,12)} />
					<IngredientListElement className={this.state.visibility[13]}
						valueABV={this.state.ingredientABV[13]}
						onChangeABV={value => this.changeABV(value,13)}
						valueParts={this.state.parts[13]}
						onChangeParts={value => this.changeParts(value,13)} />
					<IngredientListElement className={this.state.visibility[14]}
						valueABV={this.state.ingredientABV[14]}
						onChangeABV={value => this.changeABV(value,14)}
						valueParts={this.state.parts[14]}
						onChangeParts={value => this.changeParts(value,14)} />
				</ul>
			</div>
		);
	}
}

export default RecipeCreator;