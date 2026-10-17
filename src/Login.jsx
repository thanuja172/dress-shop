import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      // Get users from backend
      const response = await fetch(
        "http://dress-shop-backend.vercel.app/api/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();

      // Find matching user
      const user = users.find(
        (user) =>
          user.email === email &&
          user.password === password
      );

      // User not found
      if (!user) {
        alert("Invalid email or password");
        return;
      }

      // =================================
      // SAVE LOGGED-IN USER
      // =================================

      localStorage.setItem(
        "userId",
        user._id
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // =================================
      // LOGIN SUCCESS
      // =================================

      alert("Login successful!");

      navigate("/home");

    } catch (error) {
      console.log("Login error:", error);

      alert(
        "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>Fashion Store</h1>

        <p>Customer Login</p>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="off"
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="new-password"
              required
            />

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;