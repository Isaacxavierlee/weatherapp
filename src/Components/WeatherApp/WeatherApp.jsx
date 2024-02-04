import React, { useState } from "react";
import './WeatherApp.css'

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: "",
    windSpeed: "",
    temperature: "",
    location: "",
    weatherCondition: { description: "overcast clouds" } // Default value
  });

  const api_key = "6d126598a72830c9888192f16df92b09";

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
        weatherCondition: data.weather[0]
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }  
  };

  const getWeatherIcon = () => {
    const weatherIconMapping = {
      Clear: clear_icon,
      Clouds: cloud_icon,
      Drizzle: drizzle_icon,
      Rain: rain_icon,
      Snow: snow_icon
      // Add more mappings as needed
    };

    return weatherIconMapping[weatherData.weatherCondition.description.toLowerCase()] || cloud_icon;
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search"></input>
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>

      <div className="weather-image">
        <img src={getWeatherIcon()} alt="" />
      </div>
      <div className="weather-temp">{weatherData.temperature}°C</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="weather-condition">
        <div className="condition-description">{weatherData.weatherCondition.description}</div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
