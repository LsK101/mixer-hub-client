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
			"ingredientABV": [100,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			"parts": [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0]
		};
	}

	changeNumberOfIngredients(value) {
		let changeValue = parseInt(value,10);
		this.setState({
			"ingredients": changeValue
		})
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
		for (let i = 0; i < ingredientABV.length; i++) {
			alcohol = ingredientABV[i] * parts[i];
			totalAlcohol = totalAlcohol + alcohol;
		}
		return totalAlcohol;
	}

	getTotalParts(parts) {
		let runningTotal = 0;
		let partsSingle;
		for (let i = 0; i < parts.length; i++) {
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
					<li className="ingredient">
						Ingredient
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[0]}
							onChange={value => this.changeABV(value,0)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[0]}
							onChange={value => this.changeParts(value,0)} />
					</li>
					<li className="ingredient">
						Ingredient
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[1]}
							onChange={value => this.changeABV(value,1)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[1]}
							onChange={value => this.changeParts(value,1)} />
					</li>
					<li className="ingredient">
						Ingredient
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[2]}
							onChange={value => this.changeABV(value,2)} />
						Parts In Mixture
						<NumberInput min={0} max={999} value={this.state.parts[2]}
							onChange={value => this.changeParts(value,2)} />
					</li>
				</ul>
			</div>
		);
	}
}

export default RecipeCreator;