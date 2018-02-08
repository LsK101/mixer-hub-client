import React from 'react';
import './recipe-creator-ingredient-li.css';
import TextInput from './text-input';
import NumberInput from './number-input';

function IngredientListElement(props) {
	return (
		<li className={props.className}>
			<span>Ingredient:</span><br/>
			<TextInput divClassName="ingredient-input-container"
				value={props.valueIngredient} 
				onChange={value => props.onChangeIngredient(value)} />

			<br/>

			<NumberInput divClassName="ABV-input-container" className="ABV-input"
				min={0} max={100} value={props.valueABV}
				onChange={value => props.onChangeABV(value)} />
			<span>% ABV</span>

			<br/>

			<NumberInput divClassName="parts-input-container" className="parts-input"
				min={0} max={99999} value={props.valueParts}
				onChange={value => props.onChangeParts(value)} />
			<span> Parts</span>
		</li>
	);
}

export default IngredientListElement;