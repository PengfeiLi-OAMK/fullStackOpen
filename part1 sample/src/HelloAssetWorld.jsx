/*
Create a new component with name HelloAssetWorld, which will render two things:
· H1 element with text “Hello Asset World”
· Image element, which uses the image below as an asset (you will need to copy and save the image to your project and then import it in your code).
*/
import Map from "./assets/map.png";
export default function HelloAssetWorld() {
  return (
	<div>
	  <h1>Hello Asset World</h1>
	  <img src={Map}  />
	</div>
  );
}