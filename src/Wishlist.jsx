import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);

  // Load Wishlist
  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  // ❤️ Remove from Wishlist
  const removeFromWishlist = (name) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.name !== name
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  // 🛒 Add Wishlist item to Cart
  const addToCart = (product) => {
    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) => item.name === product.name
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity =
        (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    navigate("/cart");
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* WISHLIST PAGE */}
      <div className="wishlist-page">

        {/* Wishlist Title */}
        <h1>❤️ My Wishlist</h1>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (

          <div className="empty-wishlist">

            <h2>
              Your Wishlist is Empty
            </h2>

            <button
              onClick={() => navigate("/home")}
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          /* Wishlist Products */
          <div className="wishlist-products">

            {wishlist.map((product) => (

              <div
                className="wishlist-card"
                key={product.id || product.name}
              >

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                />

                {/* Product Name */}
                <h3>
                  {product.name}
                </h3>

                {/* Product Price */}
                <p>
                  ₹{product.price}
                </p>

                {/* Buttons */}
                <div className="wishlist-buttons">

                  {/* Add to Cart */}
                  <button
                    className="cart-btn"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    🛒 Add to Cart
                  </button>

                  {/* Remove */}
                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromWishlist(
                        product.name
                      )
                    }
                  >
                    Remove ❤️
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
}

export default Wishlist;