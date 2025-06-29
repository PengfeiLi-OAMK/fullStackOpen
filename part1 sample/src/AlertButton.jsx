//Create a new component called “AlertButton”. The alert button should display a browser alert dialog when clicked.
import classes from './ConsoleButton.module.css';
function AlertButton() {
	function handleClick() {
		alert("Hello from AlertButton!");
	}
	return (
		<div
			onClick={handleClick}
			className={classes.button}>
			Alertbutton
		</div>
	);
}
export default AlertButton;