import { useState, useEffect } from "react";
import axios from "axios";
const Country = ({ country }) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [capitalWeather, setCapitalWeather] = useState({});
  useEffect(() => {
    if (!country.capital) {
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        setCapitalWeather(response.data);
        console.log(`Weather icon :${response.data.weather[0].icon}`);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }, [country]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(([code, lang]) => (
          <li key={code}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        style={{ width: "200px" }}
      />
      {Object.keys(capitalWeather).length > 0 && (
        <>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {`${capitalWeather.main.temp} ℃`}</p>
          <img
            src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`}
            alt={capitalWeather.weather.description}
          />
          <p>Wind: {`${capitalWeather.wind.speed} m/s`}</p>
        </>
      )}
    </div>
  );
};
export default Country;
