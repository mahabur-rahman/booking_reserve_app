import React from "react";
import { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  // console.log(credentials);

  // context api
  const { user, dispatch, error, loading } = useContext(AuthContext);
  console.log("login page : ", user);

  // handleChange
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // login api call
  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
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

        <button className="lButton" onClick={handleClick} disabled={loading}>
          Login
        </button>

        {error && <span className="errorMessage">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
