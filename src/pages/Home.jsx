import React, { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [projects, setProjects] = useState([]);
  const [doneProjects, setDoneProjects] = useState([]);

  const userID = useGetUserID();

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
            <img src={project.imageUrl} alt={project.name} />
            <p>Working Time: {project.worktime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};