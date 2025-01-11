import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error.message);
        });
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.name || "Location"}
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp - 273.15)}°C</h1> : <h1>--°C</h1>}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : <p>Description</p>}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{Math.round(data.main.feels_like - 273.15)}°C</p> : <p className="bold">--°C</p>}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : <p className="bold">--%</p>}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} m/s</p> : <p className="bold">-- m/s</p>}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
