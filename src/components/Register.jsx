import React, { useState } from "react";
import Form from "./Form";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {username,password})
      alert("Registration Completed! Now login")
    } catch (error) {
console.error(error)
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Sign Up"
      onSubmit={onSubmit}
    />
  );
}
