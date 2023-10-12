import React, { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [projects, setProjects] = useState([]);
  const [doneProjects, setDoneProjects] = useState([]);
  const [weatherData, setWeatherData] = useState(null); // State for weather data

  const userID = useGetUserID();

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Cincinnati&appid=fc5ca2460eb25be5708c1791e5823986
        `
      );

      // Update the weatherData state with the response data
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/projects");
        setProjects(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchDoneProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/projects/doneprojects/ids/${userID}`
        );
        setDoneProjects(response.data.doneProjects);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
    fetchDoneProject();

    // Fetch weather data when the component mounts
    fetchWeatherData();
  }, []);

  const doneProject = async (projectID) => {
    try {
      const response = await axios.put("http://localhost:3001/projects", {
        projectID,
        userID,
      });
      setDoneProjects(response.data.doneProjects);
    } catch (err) {
      console.log(err);
    }
  };

  const isProjectDone = (id) => doneProjects.includes(id);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <div>
              <h2>{project.name}</h2>
              <button
                onClick={() => doneProject(project._id)}
                disabled={isProjectDone(project._id)}
              >
                {isProjectDone(project._id) ? "Done" : "Not Done"}
              </button>
            </div>
            <div className="description">
              <p>{project.description}</p>
            </div>
            <img src={project.imgUrl} alt={project.name} />
            <p>Working Time: {project.worktime} hours</p>
          </li>
        ))}
      </ul>

      {/* Display weather data */}
      {weatherData && (
        <div className="weather-info">
          <h3>Weather Information</h3>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};
