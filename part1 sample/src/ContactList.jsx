//Create a new component to represent a contact list, which can have multiple contact list items in it. You should create a single “ContactList” component, which renders multiple “ContactItem” components. Render the “ContactList” component in the App.js. The “ContactList” component should use props to receive the names and addresses of the persons to render.
import ContactItem from "./ContactItem";
function ContactList({contacts}){
	let output=[];
	for (let i=0; i<contacts.length; i++){
		output.push(<ContactItem name={contacts[i].name} address={contacts[i].address} />);
	}
	return (
		<div>
			{output}
		</div>
	);
}
export default ContactList;