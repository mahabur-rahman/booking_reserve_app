import React from "react";
import { useState } from "react";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  console.log(credentials);

  // handleChange
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          className="lInput"
          id="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="lInput"
          id="password"
          onChange={handleChange}
        />

        <button className="lButton">Login</button>

        <span className="errorMessage">error message</span>
      </div>
    </div>
  );
};

export default Login;
