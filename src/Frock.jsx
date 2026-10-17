import React from "react";
import { useNavigate } from "react-router-dom";

import frock1 from "Jackie-Seiden-Feet-8478656.jpg";
import frock2 from "./assets/frock/frock2.jpg";
import frock3 from "./assets/frock/frock3.jpg";
import frock4 from "./assets/frock/frock4.jpg";
import frock5 from "./assets/frock/frock5.jpg";

function Frock({ addToCart }) {

  const navigate = useNavigate();

  const products = [
    { name: "Frock 1", price: 899, image: frock1 },
    { name: "Frock 2", price: 999, image: frock2 },
    { name: "Frock 3", price: 799, image: frock3 },
    { name: "Frock 4", price: 1099, image: frock4 },
    { name: "Frock 5", price: 1299, image: frock5 }
  ];

  return (
    <ProductPage
      title="Frock Collection"
      products={products}
      addToCart={addToCart}
      navigate={navigate}
    />
  );
}

function ProductPage({ title, products, addToCart, navigate }) {

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
        {title}
      </h1>

      <div className="product-grid">

        {products.map((item, index) => (

          <div className="product-card" key={index}>

            <img
              src={item.image}
              alt={item.name}
            />

            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

            <button
              onClick={() => {
                addToCart(item);
                navigate("/cart");
              }}
            >
              Add to Cart
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Frock;