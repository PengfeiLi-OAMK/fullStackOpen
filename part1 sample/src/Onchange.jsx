//Create a component, which renders a single text input and uses onChange event handler to print to console the text written to the text input. The text input event handler function will receive a parameter from react, when called and the parameter is identical to the regular browser input event type (https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event). This means that you can read the text input field value from the event handler parameter object property .target.value.
function Onchange() {
	function textChange(event) {
		console.log(event.target.value);
	}
	return (
		<input
			onChange={textChange}
			type="text"
		/>
	);
}