import React from 'react';

function OutputValue(props) {
	return (
		<div className={props.className}>
			<label>{props.label}</label>
			<output>{props.value}</output>
		</div>
	);
}

export default OutputValue;