const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};
const Part = ({part, exercises}) => {
  return (
    <div>
      <p>
        {part} {exercises}
      </p>
    </div>
  );
};
const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part, index) => (
        <Part key={index} part={part.name} exercises={part.exercises} />
      ))}
      {/* <Part
        part={course.parts[0].name}
        exercises={course.parts[0].exercises}
      />
      <Part
        part={course.parts[1].name}
        exercises={props.course.parts[1].exercises}
      />
      <Part
        part={props.course.parts[2].name}
        exercises={props.course.parts[2].exercises}
      /> */}
    </div>
  );
};
const Total = ({ course }) => {
  
  return (
    <div>
      <p>
        Number of exercises{" "}
        {course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises}
      </p>
    </div>
  );
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  


  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}

export default App