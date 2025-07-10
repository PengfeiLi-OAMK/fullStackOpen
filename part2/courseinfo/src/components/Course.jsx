const Header = ({ course }) => <h2>{course}</h2>;

const Content = ({ parts }) =>
  parts.map((part) => (
    <div key={part.id}>
      <Part part={part} />
    </div>
  ));
// <div>
//   <Part part={parts[0]} />
//   <Part part={parts[1]} />
//   <Part part={parts[2]} />
// </div>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ total }) => (
  <p>
    <strong>Number of exercises {total}</strong>
  </p>
);

const Course = ({ courses }) =>
  courses.map((course) => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      />
    </div>
  ));
export default Course;
