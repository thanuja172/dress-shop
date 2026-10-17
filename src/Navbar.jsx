import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        Fashion Store
      </div>

      {/* Search */}
      <div className="search">
        <input
          type="text"
          placeholder="Search dresses..."
        />
      </div>

      {/* Navigation */}
      <div className="nav-links">

        <Link to="/home">
          🏠 Home
        </Link>

        <Link to="/wishlist">
          ♡ Wishlist
        </Link>

        <Link to="/cart">
          🛒 Cart
        </Link>

        <Link to="/profile">
          👤 Profile
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;