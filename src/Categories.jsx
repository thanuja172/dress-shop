import React from "react";
import { useNavigate } from "react-router-dom";

function Categories() {

  const navigate = useNavigate();

  const categories = [
    ["Frock", "/frock"],
    ["Lehenga", "/lehenga"],
    ["Western Wear", "/western"],
    ["Kurti", "/kurti"],
    ["Jeans", "/jeans"],
    ["Tops", "/tops"],
    ["Saree", "/saree"],
    ["Party Wear", "/partywear"]
  ];

  return (
    <div>

      <nav className="navbar">
        <h2>Fashion Store</h2>

        <button
          className="cart-btn"
          onClick={() => navigate("/cart")}
        >
          🛒 Cart
        </button>
      </nav>

      <h1 className="category-title">
        Categories
      </h1>

      <div className="category-list">

        {categories.map((item) => (

          <button
            key={item[0]}
            onClick={() => navigate(item[1])}
          >
            {item[0]}
          </button>

        ))}

      </div>

    </div>
  );
}

export default Categories;