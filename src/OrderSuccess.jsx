import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="order-success">

      <div className="success-box">

        <div className="success-icon">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with Elegant.
        </p>

        <p className="success-small">
          Your order has been confirmed.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="continue-btn"
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;