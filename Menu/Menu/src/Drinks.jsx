/*Lets begin to create a restaurant web application. First goal is to implement the menu (the foods offered) of the restaurant. In this exercises your goal is to create a menu structure, which allows the user to browse the foods offered by the restaurant. The restaurant owner wants to separate the menu into two categories. First should be main courses and second should be drinks.
Here are the steps which to follow:
1. Create a new empty react project
2. Create the two components – MainCourses and Drinks. Put some example dishes into the MainCourses component and some example drinks into the Drinks component to be rendered. The content in both can be hard coded as JSX for now.
*/
export default function Drinks() {
	return (
		<div>
			<h2>Drinks</h2>
			<ul>
				<li>Coffe</li>
				<li>Beer</li>
				<li>Tea</li>
				<li>Cola</li>
			</ul>
		</div>
	)
}