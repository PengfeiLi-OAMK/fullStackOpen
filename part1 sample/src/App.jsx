import Header from "./Header";
import ColorList from "./ColorList";
import ContactList from "./ContactList";
import ConsoleButton from "./ConsoleButton";
import AlertButton from "./AlertButton";
import TextReader from "./TextReader";
import HelloAssetWorld from "./HelloAssetWorld";
const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <h1>Hello , React</h1>
    </div>
  )
}

function getGreeting () {
  return "Welcome to the World of React";
    

}



const App = () => {
  const friends = [ 'Peter', 'Maya']
  const color1 = "red";
  const color2 = "green";
  const color3 = "blue";

  const persons=[
    {name: "Peter", address: "Petersvej 1"},
    {name: "Maya", address: "Mayavej 2"},
    {name: "John", address: "Johnsvej 3"},
    {name: "Sara", address: "Saravej 4"}
  ]
  return (
    <div>
      <HelloAssetWorld/>
      <TextReader />
      <AlertButton />
    <ConsoleButton consoleText="hi,felix" />
     <Header />
    <Hello />
      <p>{getGreeting()}</p>
      <p>{friends.join(", ")}</p>
    < ColorList color1={color1} />
    <ContactList contacts={persons} />
    </div>
  )
}

export default App