import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Fetch the list of users from the JSON server
      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;

      // Find a user with the matching username
      const user = users.find((user) => user.username === username);

      if (user) {
        // Check if the password matches
        if (user.password === password) {
          login(user);
          navigate("/");
        } else {
          // Password does not match; handle login error (e.g., display an error message).
          console.error("Invalid password");
        }
      } else {
        // Username not found; handle login error (e.g., display an error message).
        console.error("User not found");
      }
    } catch (error) {
      // Handle network or server-related errors here
      console.error("Login failed. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
