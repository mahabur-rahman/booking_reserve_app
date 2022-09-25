import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  //   ####### CONTEXT API #######
  const { user, dispatch, error, loading } = useContext(AuthContext);

  //   handleChange
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  //   login
  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/login", credentials);

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  //   console.log("login page :", user);

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

        <button className="lButton" onClick={handleClick} disabled={loading}>
          Login
        </button>

        {error && <span className="errorMessage">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
