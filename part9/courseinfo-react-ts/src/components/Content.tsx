import Part from "./Part";
import type { CoursePart } from "../type";
interface ContentProps {
  parts: CoursePart[];
};

const Content=(props:ContentProps) => {
	return (
		<div>
			{props.parts.map((part) => (
				<p key={part.name}>
					<Part part={part} />
				</p>
			))}
		</div>
	);
}
export default Content;