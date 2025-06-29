import React from 'react';
import { useState } from 'react';
//Create a component, which renders an text input field, an empty div and a button. The component should work so that when the user clicks on the button, the component renders to the div the text input content. For example, if the user writes “Test” to the text input and clicks the button, the text “Test” should be displayed in the div.Implementing this requires the hook useState.
export default  function TextReader() {
	const [textHoder, setTextHoder] = useState("");
	const [text, setText] = useState("");
	function  buttonClick() {
		console.log("button clicked");	
		setText(textHoder);
	}
	function changeInput(event) {
		setTextHoder(event.target.value);
	}
	
	return (
		<div>
			<input
				type="text" onChange={changeInput}
			/>
			<button onClick={buttonClick}>Click me</button>
			<div>{text}</div>
			
		</div>
	);
	
	
	}

