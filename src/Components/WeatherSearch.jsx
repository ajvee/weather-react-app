import { useState } from 'react';

function WeatherSearch() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [previousSearches, setPreviousSearches] = useState([]);

  const fetchWeather = async () => {
    const response = await fetch(`https://wttr.in/${location}?format=j1`);
    const data = await response.json();
    setWeather(data);
    setPreviousSearches([...previousSearches, location]);
  };

  return (
    <div>
      <h1>Weather From</h1>
      <label>
        Enter a location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <button onClick={fetchWeather}>Search</button>
      {weather && (
        <div>
          <h2>Weather for {weather.nearest_area[0].areaName[0].value}</h2>
          <p>Current temperature: {weather.current_condition[0].temp_F} °F</p>
          <p>Current weather: {weather.current_condition[0].weatherDesc[0].value}</p>
          <h3>Forecast</h3>
          <ul>
            {weather.weather.map((item, index) => (
              <li key={index}>
                {item.date} - Low: {item.mintempF} °F, High: {item.maxtempF} °F, {item.hourly[0].weatherDesc[0].value}
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2>Previous Searches:</h2>
      <ul>
        {previousSearches.map((search, index) => (
          <li key={index}>{search}</li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherSearch;
