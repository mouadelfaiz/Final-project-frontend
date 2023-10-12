import axios from "axios";
import React, { useState, useEffect } from "react";
import useGetUserID from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateProject = () => {
  // ... Your existing code

  // State for weather data
  const [weatherData, setWeatherData] = useState(null);

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    try {
      // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=YOUR_API_KEY`
      );

      // Update the weatherData state with the response data
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    // Fetch weather data when the component mounts
    fetchWeatherData();
  }, []);

  return (
    <div className="create-project">
      <h2>Create Project</h2>

      {/* Display weather data */}
      {weatherData && (
        <div className="weather-info">
          <h3>Weather Information</h3>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Your form inputs here */}
      </form>
    </div>
  );
};
