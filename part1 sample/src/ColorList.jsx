//Create a new React component called `ColorList` that renders an unordered list of three different colors, each color as a string in list item. The colors are passed to the ColorList component as props. Create three props named color1, color2, color3. Import the component and render it in the main App component.
function ColorList(props){

	return (
		<div>
			<h1>Color List</h1>
			<ul>
				<li>{props.color1}</li>
				<li>{props.color2}</li>
				<li>{props.color3}</li>
				
			</ul>
		</div>
	);
}
export default ColorList;