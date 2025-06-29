/*
Exercise 6:

Create a component, which renders a form with three fields – first name, family name and email address. In addition the component should render a button with text “Save”. When the user clicks on the button, the component should hide the forms fields and display text below the button in the format “Saved <firstname> <familyname> (<email>)”. For example “Saved John Doe (john.doe@email.com)”.

Implementing this requires the hook useState.
*/
import { useState } from "react";
import Output from "./Form";
function ThreeFieldsForm() {
	
	const [DataSaved, setDataSaved] = useState(false);
	
let formvisibility = "block";
let stringvisibility = "none";

	if (DataSaved===true) {
		formvisibility = "none";
		stringvisibility = "block";
	}
function SaveClick() {
	   
		setDataSaved(true);
		
	}
	let output=

	return (
		<div>
			<Output />
			<div style={{display:stringvisibility}}>Saved {firstName} {familyName} ({email})</div>
		</div>
	);
}