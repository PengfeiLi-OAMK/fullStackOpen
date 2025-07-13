import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personServices from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumer] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [className, setClassName] = useState(null);

  useEffect(() => {
    personServices
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1,
    };
    const findPerson = persons.find((person) => person.name === newName);
    if (findPerson) {
      const confirmUpdate = window.confirm(
        `${findPerson.name}is already added to the phonebook,replace the old number with a new one?`
      );
      if (confirmUpdate) {
        personServices
          .update(findPerson.id, personObject)
          .then((updatedPerson) => {
            console.log("updatedPerson", updatedPerson, updatedPerson.id);

            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
          })
          .catch((error) => {
            setMessage(
              `Information of ${findPerson.name} has already been removed from server`
            );
            setClassName("error");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      personServices.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage(`Added ${returnedPerson.name}`);
        setClassName("added");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
    setNewName("");
    setNewNumer("");
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personServices.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumer(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={className} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
