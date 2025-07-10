import CountryName from "./CountryName";
import Country from "./Country";
const Countries = ({ countries }) => {
  if (!countries || countries.length == 0) {
    return;
  }

  if (countries.length > 10) {
    return <div>Too many countries, specify another filter</div>;
  }

  if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.cca3}>
            <CountryName country={country} />
          </div>
        ))}
      </div>
    );
  }
  if (countries.length == 1) {
    console.log(Object.entries(countries[0].languages));

    return (
      <div>
        <Country country={countries[0]} />
        {/* <h2>{countries[0].name.common}</h2>
        <p>Capital: {countries[0].capital}</p>
        <p>Area: {countries[0].area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.entries(countries[0].languages).map(([code, lang]) => (
            <li key={code}>{lang}</li>
          ))}
        </ul>
        <img
          src={countries[0].flags.png}
          alt={countries[0].flags.alt}
          style={{ width: "200px" }}
        /> */}
      </div>
    );
  }
};
export default Countries;
