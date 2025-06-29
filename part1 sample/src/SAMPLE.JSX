 function TextReader() {
	const [textHoder, setTextHoder] = useState("");
	const [text, setText] = useState("");
	function  buttonClick() {
		console.log("button clicked");	
		setText(textHoder);
	}
	function changeInput(event) {
		setTextHoder(event.target.value);
	}
	return (
		<div>
			<input
				type="text" onChange={changeInput}
			/>
			<button onClick={buttonClick}>Click me</button>
			<div>{text}</div>
			
		</div>
	);
	
	
	}
 function TextReader() {
	
	const [text, setText] = useState("");
	let textHoder = "";
	function changeInput(event) {
		textHoder=event.target.value;
	}
	function  buttonClick() {
		console.log("button clicked");	
		setText(textHoder);
	}
	
	return (
		<div>
			<input
				type="text" onChange={changeInput}
			/>
			<button onClick={buttonClick}>Click me</button>
			<div>{text}</div>
			
		</div>
	);
	
	
	}