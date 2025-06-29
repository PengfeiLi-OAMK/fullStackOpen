
import React, { useState } from "react";
function Form({SaveClick}) {

	const [firstName, setFirstName] = useState("");
	const [familyName, setFamilyName] = useState("");
	const [email, setEmail] = useState("");

	function FirstnameChange(event) {
		setFirstName(event.target.value);
	}
function FamilynameChange(event) {
		setFamilyName(event.target.value);
	}
function EmailChange(event) {
		setEmail(event.target.value);
	
	}	
	function HandleButtonclick(){
		SaveClick()
	}
return (
	<div >
		<input type="text" onChange={FirstnameChange} placeholder="First name" />
		<input type="text" onChange={FamilynameChange} placeholder="Family name" />
		<input type="email" onChange={EmailChange} placeholder="Email address" />
		<button onClick={HandleButtonclick}>Save</button>
		
	</div>
)
	
	  }
export default Form;