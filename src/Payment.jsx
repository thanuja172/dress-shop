import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import Navbar from "./Navbar";

function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // =========================
  // GET CART
  // =========================

  const cart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  // =========================
  // TOTAL
  // =========================

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(
        String(item.price)
          .replace("₹", "")
          .replace(",", "")
          .trim()
      ) *
        Number(item.quantity || 1),
    0
  );

  // =========================
  // APPLY COUPON
  // =========================

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (code === "DRESS10") {
      const discountAmount = total * 0.10;

      setDiscount(discountAmount);
      setCouponMessage(
        "✓ Coupon applied successfully!"
      );
    } else if (code === "SAVE20") {
      const discountAmount = total * 0.20;

      setDiscount(discountAmount);
      setCouponMessage(
        "✓ Coupon applied successfully!"
      );
    } else if (code === "") {
      setDiscount(0);
      setCouponMessage(
        "Please enter a coupon code"
      );
    } else {
      setDiscount(0);
      setCouponMessage(
        "Invalid coupon code"
      );
    }
  };

  // =========================
  // FINAL AMOUNT
  // =========================

  const amountToPay = total - discount;

  // =========================
  // PAYMENT
  // =========================

  const handlePayment = () => {
    setPaymentSuccess(true);

    localStorage.removeItem("cart");

    localStorage.setItem(
      "paymentStatus",
      "success"
    );
  };

  // =========================
  // SUCCESS PAGE
  // =========================

  if (paymentSuccess) {
    return (
      <>
        <Navbar />

        <div className="payment-success">

          <div className="success-card">

            <div className="success-circle">
              ✓
            </div>

            <h1>
              Order Placed!
            </h1>

            <p>
              Your payment was successful.
            </p>

            <p className="success-sub">
              Thank you for shopping with us 💜
            </p>

            <button
              type="button"
              className="success-home-btn"
              onClick={() =>
                navigate("/home")
              }
            >
              Continue Shopping
            </button>

          </div>

        </div>
      </>
    );
  }

  // =========================
  // PAYMENT PAGE
  // =========================

  return (
    <>
      <Navbar />

      <div className="payment-container">

        <div className="payment-card">

          <h1>
            💳 Payment
          </h1>

          {/* =====================
              COUPON
          ===================== */}

          <div className="coupon-section">

            <h3>
              🎟️ Apply Coupon
            </h3>

            <div className="coupon-box">

              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) =>
                  setCoupon(e.target.value)
                }
              />

              <button
                type="button"
                onClick={applyCoupon}
              >
                Apply
              </button>

            </div>

            {couponMessage && (
              <p
                className={
                  discount > 0
                    ? "coupon-success"
                    : "coupon-error"
                }
              >
                {couponMessage}
              </p>
            )}

            <div className="coupon-hint">
              Try: <b>DRESS10</b> or{" "}
              <b>SAVE20</b>
            </div>

          </div>

          {/* =====================
              AMOUNT
          ===================== */}

          <div className="amount-box">

            <div className="amount-row">

              <span>
                Total Amount
              </span>

              <span>
                ₹{total.toFixed(2)}
              </span>

            </div>

            <div className="amount-row">

              <span>
                Coupon Discount
              </span>

              <span className="discount">
                - ₹{discount.toFixed(2)}
              </span>

            </div>

            <hr />

            <div className="amount-row total-row">

              <span>
                Amount to Pay:
              </span>

              <strong>
                ₹{amountToPay.toFixed(2)}
              </strong>

            </div>

          </div>

          {/* =====================
              PAYMENT METHOD
          ===================== */}

          <h3 className="method-title">
            Select Payment Method
          </h3>

          <label className="payment-option">

            <input
              type="radio"
              name="payment"
              value="card"
              checked={
                paymentMethod === "card"
              }
              onChange={() =>
                setPaymentMethod("card")
              }
            />

            <span>
              💳 Card / UPI
            </span>

          </label>

          <label className="payment-option">

            <input
              type="radio"
              name="payment"
              value="cod"
              checked={
                paymentMethod === "cod"
              }
              onChange={() =>
                setPaymentMethod("cod")
              }
            />

            <span>
              💵 Cash on Delivery
            </span>

          </label>

          {/* =====================
              PAY
          ===================== */}

          <button
            type="button"
            className="pay-btn"
            onClick={handlePayment}
          >
            Pay ₹{amountToPay.toFixed(2)}
          </button>

          {/* =====================
              BACK
          ===================== */}

          <button
            type="button"
            className="back-btn"
            onClick={() =>
              navigate("/cart")
            }
          >
            ← Back to Cart
          </button>

        </div>

      </div>
    </>
  );
}
export default Payment;
