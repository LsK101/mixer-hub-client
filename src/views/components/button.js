import React from 'react';

function Button(props) {
	return (
		<div className={props.divClassName}>
			<input type="button" className={props.className} value={props.value} 
				onClick={e => props.onClick()} />
		</div>
	);
}

export default Button;