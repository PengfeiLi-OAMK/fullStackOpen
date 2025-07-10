import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [searchItem, setSearchItem] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log();

    if (searchItem) {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
          const allCountries = response.data;
          const filteredCountries = allCountries.filter((country) =>
            country.name.common.toLowerCase().includes(searchItem.toLowerCase())
          );
          setCountries(filteredCountries);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
        });
    }
  }, [searchItem]);
  const handleChange = (event) => {
    setSearchItem(event.target.value);
  };

  return (
    <div>
      <p>
        find countries: <input value={searchItem} onChange={handleChange} />
      </p>
      <Countries countries={countries} />
    </div>
  );
};

export default App;
