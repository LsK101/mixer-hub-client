import React from 'react';

function NumberInput(props) {
	return (
		<div className={props.divClassName}>
			<input type="number" className={props.className} min={props.min} max={props.max} 
				value={props.value} onChange={e => props.onChange(e.target.value)} />
		</div>
	);
}

export default NumberInput;