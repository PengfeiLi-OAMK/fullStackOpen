import Country from "./Country";
import { useState } from "react";

const CountryName = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);
  const showCountryDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <>
      <p>
        {country.name.common}
        <button onClick={showCountryDetails}>
          {showDetails ? "Hide" : "Show"}
        </button>
      </p>
      {showDetails && <Country country={country} />}
    </>
  );
};
export default CountryName;
