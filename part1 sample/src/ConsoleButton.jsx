//Create a new component called “ConsoleButton”, which renders a single button element and uses click handler to print text “Hello from ConsoleButton!” to javascript console when the button is clicked by the user. Declare the click handler function inside the “ConsoleButton” component. Render the “ConsoleButton” in the App.js.
//Modify the “ConsoleButton” component so that the component accepts a prop called “consoleText” and the prop value is printed to the console, when the button is clicked.
import classes from './ConsoleButton.module.css';



export default function ConsoleButton({consoleText}) {

	function handleClick() {
		console.log(consoleText);
	}

	return (
		<div
			onClick={handleClick}
			className={classes.button}>
			Consolebutton
		</div>
		
	);
}