import React from 'react';
import './recipe-creator-ingredient-li.css';
import TextInput from './text-input';
import NumberInput from './number-input';

function IngredientListElement(props) {
	return (
		<li className={props.className}>
			Ingredient
			<TextInput />
			Base ABV<br/>
			<NumberInput divClassName="ABV-input" min={0} max={100} value={props.valueABV}
				onChange={value => props.onChangeABV(value)} />
			<span>%</span><br/>
			<span>Parts In Mixture</span>
			<NumberInput min={0} max={99999} value={props.valueParts}
				onChange={value => props.onChangeParts(value)} />
		</li>
	);
}

export default IngredientListElement;