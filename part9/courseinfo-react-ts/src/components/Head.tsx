interface NameProps {
  name: string;
}
const Head = (props: NameProps) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
};

export default Head;