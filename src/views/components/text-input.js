import React from 'react';

function TextInput(props) {
	return (
		<div className={props.divClassName}>
			<input type="text" className={props.className} value={props.value} 
				onChange={e => props.onChange(e.target.value)} />
		</div>
	);
}

export default TextInput;