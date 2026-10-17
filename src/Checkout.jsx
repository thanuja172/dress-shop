import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

console.log("CHECKOUT FILE LOADED");

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);
  const [address, setAddress] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("checkoutCart");

    if (savedCart) {
      try {
        const data = JSON.parse(savedCart);

        if (Array.isArray(data)) {
          setCart(data);
        } else {
          setCart([data]);
        }
      } catch (error) {
        console.log("Checkout error:", error);
        setCart([]);
      }
    } else {
      const normalCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setCart(normalCart);
    }

    const savedAddress = localStorage.getItem("deliveryAddress");

    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

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

  const total = cart.reduce((sum, item) => {
    const price = getPrice(item.price);
    const quantity = Number(item.quantity || 1);

    return sum + price * quantity;
  }, 0);

  const discountAmount = (total * couponDiscount) / 100;

  const finalTotal = Math.max(
    total - discountAmount,
    0
  );
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage("Please enter coupon code");
      return;
    }

    try {
      setCouponLoading(true);
      setCouponMessage("");

      const response = await fetch(
        "http://dress-shop-backend.vercel.app/api/coupons/validate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: couponCode.trim().toUpperCase(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setCouponDiscount(0);
        setCouponMessage(
          data.message || "Invalid coupon"
        );
        return;
      }

      const discount = Number(
        data.coupon?.discount || 0
      );

      setCouponDiscount(discount);

      setCouponMessage(
        `Coupon applied! ${discount}% discount`
      );
    } catch (error) {
      console.error("COUPON ERROR:", error);
      setCouponMessage("Unable to apply coupon");
    } finally {
      setCouponLoading(false);
    }
  };


  const goToPayment = () => {
    console.log("CONTINUE TO PAYMENT CLICKED");

    if (!cart || cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    localStorage.setItem(
      "deliveryAddress",
      address
    );

    navigate("/payment", {
      state: {
        amount: finalTotal,
        couponDiscount: discountAmount,
      },
    });
  };


  const placeOrder = async () => {
    if (!cart || cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login before placing order");
        navigate("/login");
        return;
      }

      const orderData = {
        userId: userId,

        products: cart.map((item) => ({
          productId: item.id || item._id,

          name: item.name,

          price: getPrice(item.price),

          quantity: Number(item.quantity || 1),
        })),

        totalAmount: finalTotal,

        status: "Pending",

        address: address,
      };

      console.log(
        "SENDING ORDER:",
        orderData
      );

      const response = await fetch(
        "http://dress-shop-backend.vercel.app/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      console.log(
        "ORDER RESPONSE:",
        data
      );

      if (!response.ok) {
        alert(
          data.message ||
          data.error ||
          "Order failed"
        );
        return;
      }

      setOrdered(true);

      localStorage.removeItem("cart");
      localStorage.removeItem("checkoutCart");

    } catch (error) {
      console.error(
        "ORDER ERROR:",
        error
      );

      alert("Unable to place order");
    }
  };
  <button
  type="button"
  className="place-order-button"
  onClick={goToPayment}
>
  Continue to Payment ₹{finalTotal.toFixed(2)}
</button>

if (ordered) {
    return (
      <div className="checkout-page">
        <div className="checkout-card">
          <h1>🎉 Order Placed Successfully!</h1>

          <p>
            Thank you for your order.
          </p>

          <button
            type="button"
            className="place-order-button"
            onClick={() => navigate("/home")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }


  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-card">
          <h1>🛒 Your cart is empty</h1>

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/cart")}
          >
            ← Back to Cart
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="checkout-page">

      <h1 className="checkout-title">
        🛍️ Checkout
      </h1>

      <div className="checkout-card">

        {cart.map((item, index) => (
          <div
            className="checkout-product"
            key={index}
          >
            <h3>{item.name}</h3>

            <p>
              Price: ₹{getPrice(item.price)}
            </p>

            <p>
              Quantity: {Number(item.quantity || 1)}
            </p>
          </div>
        ))}


        <div className="coupon-section">

          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) =>
              setCouponCode(e.target.value)
            }
          />

          <button
            type="button"
            onClick={applyCoupon}
            disabled={couponLoading}
          >
            {couponLoading
              ? "Applying..."
              : "Apply Coupon"}
          </button>

          {couponMessage && (
            <p>{couponMessage}</p>
          )}

        </div>


        <div className="address-section">

          <textarea
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

        </div>


        <div className="checkout-total">

          <h3>
            Original Total: ₹
            {total.toFixed(2)}
          </h3>

          <h3>
            Discount: - ₹
            {discountAmount.toFixed(2)}
          </h3>

          <h2>
            Grand Total: ₹
            {finalTotal.toFixed(2)}
          </h2>

        </div>


        {/* PAYMENT BUTTON */}

        <button
          type="button"
          className="place-order-button"
          onClick={goToPayment}
        >
          Continue to Payment ₹
          {finalTotal.toFixed(2)}
        </button>


        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/cart")}
        >
          ← Back to Cart
        </button>

      </div>

    </div>
  );
}

export default Checkout;