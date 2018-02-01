import React from 'react';
import TextInput from './text-input';
import NumberInput from './number-input';

function IngredientListElement(props) {
	return (
		<li className={props.className}>
			Ingredient Name
			<TextInput />
			Ingredient Base ABV
			<NumberInput min={0} max={100} value={props.valueABV}
				onChange={value => props.onChangeABV(value)} />
			Parts In Mixture
			<NumberInput min={0} max={999} value={props.valueParts}
				onChange={value => props.onChangeParts(value)} />
		</li>
	);
}

export default IngredientListElement;