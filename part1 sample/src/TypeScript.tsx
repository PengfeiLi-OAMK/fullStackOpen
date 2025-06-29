/*
Create a component which displays user name. The component should have two props firstName and lastName both strings. 
Add age prop to the component.
Create a component where the user information is passed through a single prop as an object
Refactor the type definition
Create a button component which has two props – label and onClick handled
Define type information for Ex72 implementation which you can find from the course example code repository
*/
import React from 'react'
export interface User {
	firstName: string;
	lastName: string;
	age: number;
}
export default function UserComponent({firstName, lastName, age}: User) {
	return <div> 
		{firstName} {lastName} {age}
		</div>;
}
export interface ButtonComponent {
	label: string;
	onClick: () => void;
}