//Create a new React component to represent a person in a contact list, the component name is ContactItem. The person item should look roughly like in the UI wireframe below. The “Name” should be with big bold letters and “address” with smaller letters. Add some whitespace padding and borders for the ContactItem. Use the component to render multiple contact list items below each other in the App root component. Put the styling to the component so that it is not global styling, but component based. The component should accept user name and address as props.
function ContactItem(props){
	const style = {	
		border: "1px solid black",
		padding: "10px",
		margin: "10px",
		width: "200px"
	};
	return (
		<div style={style}>
			<h1>{props.name}</h1>
			<p>{props.address}</p>
		</div>
	);
}
export default ContactItem;