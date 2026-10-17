import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaHeart,
  FaShoppingCart,
  FaStore,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Profile.css";

function Profile() {
  const [address, setAddress] = useState("");
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://dress-shop-backend.vercel.app/api/users/${userId}`
      );

      const data = await response.json();

      if (response.ok) {
        setAddress(data.address || "");
      }
    } catch (error) {
      console.log("FETCH USER ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

const saveAddress = async () => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    const response = await fetch(
      `http://dress-shop-backend.vercel.app/api/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: address
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Address update failed");
      return;
    }

    alert("Address saved successfully!");
  } catch (error) {
    console.log("SAVE ADDRESS ERROR:", error);
    alert("Failed to save address");
  }
};

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <FaUserCircle className="profile-header-icon" />

        <h1>My Profile</h1>

        <p>Manage your Fashion Store account</p>
      </div>

      {/* MAIN PROFILE SECTION */}
      <div className="profile-container">

        {/* LEFT SIDE */}
        <aside className="profile-sidebar">

          <div className="sidebar-profile">
            <FaUserCircle className="sidebar-avatar" />

            <h3>My Account</h3>
            <p>Fashion Store Customer</p>
          </div>

          <div className="sidebar-menu">

            <Link to="/profile" className="sidebar-item active">
              <FaUserCircle />
              <span>Account Overview</span>
            </Link>

            <Link to="/orders" className="sidebar-item">
              <FaBoxOpen />
              <span>My Orders</span>
            </Link>

            <Link to="/wishlist" className="sidebar-item">
              <FaHeart />
              <span>My Wishlist</span>
            </Link>

            <Link to="/cart" className="sidebar-item">
              <FaShoppingCart />
              <span>My Cart</span>
            </Link>

          </div>

        </aside>

        {/* RIGHT SIDE */}
        <main className="profile-main">

          <div className="account-heading">
            <h2>Account Overview</h2>
            <p>Welcome back to your Fashion Store account.</p>
          </div>

          {/* ACCOUNT CARD */}
          <div className="account-card">

            <div className="account-avatar">
              <FaUserCircle />
            </div>

            <div className="account-details">

              <h2>My Account</h2>

              <p className="welcome-text">
                Welcome back to <strong>Fashion Store</strong>
              </p>

              <div className="details-grid">

                <div className="detail-box">
                  <span>Account Type</span>
                  <strong>Customer</strong>
                </div>

                <div className="detail-box">
                  <span>Account Status</span>
                  <strong className="status-active">
                    Active
                  </strong>
                </div>

                <div className="detail-box">
                  <span>Store</span>
                  <strong>Fashion Store</strong>
                </div>

                <div className="detail-box">
                  <span>Membership</span>
                  <strong>Regular Customer</strong>
                </div>

              </div>
              <div className="address-section">
  <h3>Delivery Address</h3>

  <input
    type="text"
    placeholder="Enter your delivery address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  />

  <button type="button" onClick={saveAddress}>
    Save Address
  </button>
</div>

            </div>

          </div>

          {/* QUICK ACTIONS */}
          <div className="quick-section">

            <h2>Quick Actions</h2>

            <div className="quick-actions">

              <Link to="/orders" className="action-card">
                <div className="action-icon">
                  <FaBoxOpen />
                </div>

                <div>
                  <h3>My Orders</h3>
                  <p>View your recent orders</p>
                </div>
              </Link>

              <Link to="/wishlist" className="action-card">
                <div className="action-icon">
                  <FaHeart />
                </div>

                <div>
                  <h3>My Wishlist</h3>
                  <p>View your saved items</p>
                </div>
              </Link>

              <Link to="/cart" className="action-card">
                <div className="action-icon">
                  <FaShoppingCart />
                </div>

                <div>
                  <h3>My Cart</h3>
                  <p>Check items in your cart</p>
                </div>
              </Link>

            </div>

          </div>

          {/* CONTINUE SHOPPING */}
          <div className="shopping-section">

            <Link to="/" className="continue-shopping">
              <FaStore />
              <span>Continue Shopping</span>
            </Link>

            <Link to="/" className="logout-btn">
              <FaSignOutAlt />
              <span>Back to Store</span>
            </Link>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Profile;