import React, {Component} from 'react';
import './recipe-creator.css';
import NumberInput from './number-input';
import TextInput from './text-input';
import OutputValue from './output-value';

class RecipeCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"ingredientABV": [0,0,0],
			"parts": [0,0,0]
		};
	}

	changeABV(value,index) {
		let stateArray = this.state.ingredientABV;
		stateArray[index] = value;
		this.setState({
			"ingredientABV": stateArray
		});
	}

	changeParts(value,index) {
		let stateArray = this.state.parts;
		stateArray[index] = value;
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

	getTotalParts(array) {
		let runningTotal = 0;
		let partsSingle;
		for (let i = 0; i < array.length; i++) {
			partsSingle = array[i];
			runningTotal = runningTotal + partsSingle;
		}
		return runningTotal;
	}

	render() {
		let totalParts = this.getTotalParts(this.state.parts);
		let mixtureAlcohol = this.getTotalAlcohol(this.state.ingredientABV,this.state.parts);
		let ABV = mixtureAlcohol / totalParts;
		console.log(this.state);
		return (
			<div>
				Total Alcohol: {mixtureAlcohol}<br/>
				Total Parts: {totalParts}<br/>
				<span>Total ABV: </span><OutputValue value={ABV} className="abv-display" />%
				<ul className="ingredient-list">
					<li className="ingredient">
						Ingredient
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[0]}
							onChange={value => this.changeABV(value,0)}/>
						Parts In Mixture
						<NumberInput min={0} max={100} value={this.state.parts[0]}
							onChange={value => this.changeParts(value,0)}/>
					</li>
					<li className="ingredient">
						Ingredient
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[1]}
							onChange={value => this.changeABV(value,1)}/>
						Parts In Mixture
						<NumberInput min={0} max={100} value={this.state.parts[1]}
							onChange={value => this.changeParts(value,1)}/>
					</li>
					<li className="ingredient">
						Ingredient
						<TextInput />
						Ingredient Base ABV
						<NumberInput min={0} max={100} value={this.state.ingredientABV[2]}
							onChange={value => this.changeABV(value,2)}/>
						Parts In Mixture
						<NumberInput min={0} max={100} value={this.state.parts[2]}
							onChange={value => this.changeParts(value,2)}/>
					</li>
				</ul>
			</div>
		);
	}
}

export default RecipeCreator;