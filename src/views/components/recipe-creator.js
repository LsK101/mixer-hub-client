import React, {Component} from 'react';
import './recipe-creator.css';
import NumberInput from './number-input';
import TextInput from './text-input';
import OutputValue from './output-value';

class RecipeCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"ingredients": 2,
			"visibility": ["ingredient","ingredient","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden","ingredient-hidden"],
			"ingredientABV": [100,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
		let changeValue = parseInt(value,10);
		let changeIndex = parseInt(index,10);
		stateArray[changeIndex] = changeValue;
		this.setState({
			"ingredientABV": stateArray
		});
	}

	changeParts(value,index) {
		let stateArray = this.state.parts;
		let changeValue = parseInt(value,10);
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
					<li className={this.state.visibility[0]}>
						Ingredient 1
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[0]}
							onChange={value => this.changeABV(value,0)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[0]}
							onChange={value => this.changeParts(value,0)} />
					</li>
					<li className={this.state.visibility[1]}>
						Ingredient 2
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[1]}
							onChange={value => this.changeABV(value,1)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[1]}
							onChange={value => this.changeParts(value,1)} />
					</li>
					<li className={this.state.visibility[2]}>
						Ingredient 3
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[2]}
							onChange={value => this.changeABV(value,2)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[2]}
							onChange={value => this.changeParts(value,2)} />
					</li>
					<li className={this.state.visibility[3]}>
						Ingredient 4
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[3]}
							onChange={value => this.changeABV(value,3)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[3]}
							onChange={value => this.changeParts(value,3)} />
					</li>
					<li className={this.state.visibility[4]}>
						Ingredient 5
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[4]}
							onChange={value => this.changeABV(value,4)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[4]}
							onChange={value => this.changeParts(value,4)} />
					</li>
					<li className={this.state.visibility[5]}>
						Ingredient 6
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[5]}
							onChange={value => this.changeABV(value,5)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[5]}
							onChange={value => this.changeParts(value,5)} />
					</li>
					<li className={this.state.visibility[6]}>
						Ingredient 7
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[6]}
							onChange={value => this.changeABV(value,6)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[6]}
							onChange={value => this.changeParts(value,6)} />
					</li>
					<li className={this.state.visibility[7]}>
						Ingredient 8
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[7]}
							onChange={value => this.changeABV(value,7)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[7]}
							onChange={value => this.changeParts(value,7)} />
					</li>
					<li className={this.state.visibility[8]}>
						Ingredient 9
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[8]}
							onChange={value => this.changeABV(value,8)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[8]}
							onChange={value => this.changeParts(value,8)} />
					</li>
					<li className={this.state.visibility[9]}>
						Ingredient 10
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[9]}
							onChange={value => this.changeABV(value,9)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[9]}
							onChange={value => this.changeParts(value,9)} />
					</li>
					<li className={this.state.visibility[10]}>
						Ingredient 11
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[10]}
							onChange={value => this.changeABV(value,10)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[10]}
							onChange={value => this.changeParts(value,10)} />
					</li>
					<li className={this.state.visibility[11]}>
						Ingredient 12
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[11]}
							onChange={value => this.changeABV(value,11)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[11]}
							onChange={value => this.changeParts(value,11)} />
					</li>
					<li className={this.state.visibility[12]}>
						Ingredient 13
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[12]}
							onChange={value => this.changeABV(value,12)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[12]}
							onChange={value => this.changeParts(value,12)} />
					</li>
					<li className={this.state.visibility[13]}>
						Ingredient 14
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[13]}
							onChange={value => this.changeABV(value,13)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[13]}
							onChange={value => this.changeParts(value,13)} />
					</li>
					<li className={this.state.visibility[14]}>
						Ingredient 15
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[14]}
							onChange={value => this.changeABV(value,14)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[14]}
							onChange={value => this.changeParts(value,14)} />
					</li>
				</ul>
			</div>
		);
	}
}

export default RecipeCreator;