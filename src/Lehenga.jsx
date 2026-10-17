import React from "react";
import { useNavigate } from "react-router-dom";

import image1 from "./assets/lehenga/lehenga1.jpg";
import image2 from "./assets/lehenga/lehenga2.jpg";
import image3 from "./assets/lehenga/lehenga3.jpg";
import image4 from "./assets/lehenga/lehenga4.jpg";
import image5 from "./assets/lehenga/lehenga5.jpg";

function Lehenga({ addToCart }) {

  const navigate = useNavigate();

  const products = [
    { name: "Lehenga 1", price: 1999, image: image1 },
    { name: "Lehenga 2", price: 2499, image: image2 },
    { name: "Lehenga 3", price: 2999, image: image3 },
    { name: "Lehenga 4", price: 2199, image: image4 },
    { name: "Lehenga 5", price: 1599, image: image5 }
  ];

  return (
    <ProductPage
      title="Lehenga Collection"
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

      <h1 className="category-title">{title}</h1>

      <div className="product-grid">

        {products.map((item, index) => (

          <div className="product-card" key={index}>

            <img src={item.image} alt={item.name} />

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

export default Lehenga;