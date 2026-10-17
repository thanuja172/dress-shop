import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin123";

    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("adminLoggedIn", "true");

      alert("Admin login successful!");

      navigate("/admin");
    } else {
      alert("Invalid admin email or password");
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>Admin Login</h1>

        <p>Only admin can access Admin Panel</p>

        <form onSubmit={handleLogin}>

          {/* Admin Email */}
          <div className="input-group">

            <label>Admin Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />

          </div>

          {/* Password */}
          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

          </div>

          {/* Admin Login */}
          <button type="submit">
            Admin Login
          </button>

        </form>

        {/* Customer Register */}
        <button
          type="button"
          onClick={() => navigate("/register")}
        >
          Customer Register
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;