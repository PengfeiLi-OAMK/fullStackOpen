//Create a component with a div element. When a specific key (e.g., "Enter" key) is pressed, update the text content of the div to show a message indicating that the key was pressed.Implementing this requires the hook useState.
import React from 'react';
import { useState } from 'react';
export default function PressKey() {
	const [text, setText] = useState("");
	function keyPress(event) {
		console.log(event.key);
		setText(event.key+" was pressed");
	}
	
	return (
		<div onKeyPress={keyPress}>
			{text}
		</div>
	);
}