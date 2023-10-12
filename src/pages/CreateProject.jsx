// CreateProject.js
import React, { useState } from "react";
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateProject = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [project, setProject] = useState({
    name: "",
    description: "",
    task: [],
    instructions: "",
    imgUrl: "",
    worktime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleTaskChange = (event, index) => {
    const { value } = event.target;
    const task = [...project.task];
    task[index] = value;
    setProject({ ...project, task });
  };

  const handleAddTask = () => {
    const task = [...project.task, ""];
    setProject({ ...project, task });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://project-3-backend-dkjm.onrender.com/projects",
        { ...project },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Project Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-project">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={project.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={project.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="task">Task</label>
        {project?.task?.map((task, index) => (
          <input
            key={index}
            type="text"
            name="task"
            value={task}
            onChange={(event) => handleTaskChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddTask}>
          Add Task
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={project.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imgUrl">Image URL</label>
        <input
          type="text"
          id="imgUrl"
          name="imgUrl"
          value={project.imgUrl}
          onChange={handleChange}
        />
        <label htmlFor="worktime">Working time (hr)</label>
        <input
          type="number"
          id="worktime"
          name="worktime"
          value={project.worktime}
          onChange={handleChange}
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};
