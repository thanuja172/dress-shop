import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import Navbar from "./Navbar";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  // =========================
  // LOAD CART
  // =========================

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  // =========================
  // PLUS
  // =========================

  const increaseQty = (index) => {
    const updatedCart = [...cart];

    updatedCart[index] = {
      ...updatedCart[index],
      quantity:
        Number(updatedCart[index].quantity || 1) + 1,
    };

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // MINUS
  // =========================

  const decreaseQty = (index) => {
    const updatedCart = [...cart];

    const currentQty =
      Number(updatedCart[index].quantity || 1);

    if (currentQty > 1) {
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: currentQty - 1,
      };
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // REMOVE
  // =========================

  const removeItem = (index) => {
    const updatedCart = cart.filter(
      (_, i) => i !== index
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // PRICE
  // =========================

  const getPrice = (price) => {
    return (
      Number(
        String(price)
          .replace("₹", "")
          .replace(",", "")
          .trim()
      ) || 0
    );
  };

  // =========================
  // TOTAL
  // =========================

  const total = cart.reduce(
    (sum, item) =>
      sum +
      getPrice(item.price) *
        Number(item.quantity || 1),
    0
  );

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <div className="cart-container">

          <h1 className="cart-title">
            🛒 My Cart
          </h1>

          <div className="empty-cart">

            <h2>
              Your cart is empty
            </h2>

            <button
              type="button"
              className="continue-btn"
              onClick={() =>
                navigate("/home")
              }
            >
              ← Continue Shopping
            </button>

          </div>

        </div>
      </>
    );
  }

  // =========================
  // CART PAGE
  // =========================

  return (
    <>
      <Navbar />

      <div className="cart-container">

        <h1 className="cart-title">
          🛒 My Cart
        </h1>

        {/* CART ITEMS */}

        <div className="cart-list">

          {cart.map((item, index) => (

            <div
              className="cart-item"
              key={item.id || index}
            >

              {/* IMAGE */}

              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
              />

              {/* DETAILS */}

              <div className="cart-details">

                <h2>
                  {item.name}
                </h2>

                <h3>
                  ₹{getPrice(item.price)}
                </h3>

                {/* QUANTITY */}

                <div className="quantity-area">

                  <span className="quantity-label">
                    Quantity:
                  </span>

                  <div className="qty">

                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() =>
                        decreaseQty(index)
                      }
                    >
                      −
                    </button>

                    <span className="qty-number">
                      {Number(
                        item.quantity || 1
                      )}
                    </span>

                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() =>
                        increaseQty(index)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* SUBTOTAL */}

                <p className="subtotal">
                  Subtotal: ₹
                  {getPrice(item.price) *
                    Number(item.quantity || 1)}
                </p>

                {/* REMOVE */}

                <button
                  type="button"
                  className="remove"
                  onClick={() =>
                    removeItem(index)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* TOTAL BOX */}

        <div className="price-box">

          <h2>
            Total: ₹{total}
          </h2>

          {/* PAYMENT BUTTON */}

          <button
            type="button"
            className="order-btn"
            onClick={() =>
              navigate("/payment")
            }
          >
            Proceed to Payment
          </button>

          {/* CONTINUE SHOPPING */}

          <button
            type="button"
            className="continue-btn"
            onClick={() =>
              navigate("/home")
            }
          >
            ← Continue Shopping
          </button>

        </div>

      </div>
    </>
  );
}

export default Cart;