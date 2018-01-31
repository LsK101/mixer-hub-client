import React from 'react';

function TextInput(props) {
	return (
		<div>
			<input type="text" className={props.className} value={props.value} />
		</div>
	);
}

export default TextInput;