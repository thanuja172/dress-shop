import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Check empty fields
  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    alert("Please fill all fields");
    return;
  }

  // Check password
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Check password length
  if (formData.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    const response = await fetch("http://dress-shop-backend.vercel.app/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Registration successful!");

    navigate("/home");

  } catch (error) {
    console.log("Registration error:", error);
    alert("Registration failed. Please try again.");
  }
};

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Register to continue shopping
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

        </form>

        <div className="delivery-login">
  <p>Are you a Delivery Partner?</p>

  <button
    type="button"
    onClick={() => navigate("/delivery-partner")}
  >
    Delivery Partner Login
  </button>
</div>

        {/* Login */}
        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

        <p className="admin-login-text">
  Are you an Admin?{" "}
  <Link to="/admin-login">
    Admin Login
  </Link>
</p>

      </div>

    </div>
  );
}

export default Register;