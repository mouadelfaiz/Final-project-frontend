import React, { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID";
import axios from "axios";

export default function DoneTask() {
const [doneProjects, setDoneProjects] = useState([]);
const userID = useGetUserID();

useEffect(() => {
  const fetchDoneProject = async () => {
    try {
      const response = await axios.get(
        `https://project-3-backend-dkjm.onrender.com/projects/doneprojects/${userID}`
      );
      setDoneProjects(response.data.doneProjects);
    } catch (err) {
      console.error("Error fetching done projects, err");
    }
  };

  fetchDoneProject();
}, []);
return (
  <div>
    <h1>Saved projects</h1>
    <ul>
      {doneProjects?.map((project) => (
        <li key={project._id}>
          <div>
            <h2>{project.name}</h2>
          </div>
          <p>{project.description}</p>
          <img src={project.imageUrl} alt={project.name} />
          <p>Cooking Time: {project.cookingTime} minutes</p>
        </li>
      ))}
    </ul>
  </div>
);
}
