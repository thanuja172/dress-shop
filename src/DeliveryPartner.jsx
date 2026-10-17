import React, { useEffect, useState } from "react";
import "./DeliveryPartner.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://dress-shop-backend.vercel.app/api";

function DeliveryPartner() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  // =========================
  // GET ORDERS
  // =========================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/orders`);
      const data = await response.json();

      if (response.ok) {
        setOrders(data);
      } else {
        console.error("Failed to fetch orders:", data);
      }
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD ORDERS
  // =========================

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // ORDER COUNTS
  // =========================

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  );

  const outForDeliveryOrders = orders.filter(
    (order) => order.status === "Out for Delivery"
  );

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  );

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${API_URL}/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`Order ${newStatus}`);
        fetchOrders();
      } else {
        console.error("STATUS UPDATE ERROR:", data);
        alert("Status update failed");
      }
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);
      alert("Server error");
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("deliveryPartner");
    window.location.href = "/register";
  };

  // =========================
  // STATUS CLASS
  // =========================

  const getStatusClass = (status) => {
    if (status === "Pending") {
      return "status pending";
    }

    if (status === "Out for Delivery") {
      return "status out-for-delivery";
    }

    if (status === "Delivered") {
      return "status delivered";
    }

    return "status";
  };

  // =========================
  // ORDER ITEM
  // =========================

  const DeliveryOrder = ({ order }) => {
    return (
      <div className="delivery-card">

        <div className="delivery-info">

          <h3>
            Order #
            {order._id
              ? order._id.slice(-6).toUpperCase()
              : "------"}
          </h3>

          <p>
            Customer:{" "}
            {order.userId?.name || "Customer"}
          </p>

          <p>
            Address:{" "}
            {order.userId?.address || "Address not available"}
          </p>
          <div className="product-info">
  {order.products?.map((product) => (
    <div key={product.productId}>
      <p>
        Dress: <strong>{product.name}</strong>
      </p>

      <p>
        Quantity: {product.quantity}
      </p>
    </div>
  ))}
</div>

          <p>
            Items: {order.products?.length || 0}
          </p>

          <strong className="order-price">
            ₹{order.totalAmount}
          </strong>

        </div>

        <div className="delivery-actions">

          <span className={getStatusClass(order.status)}>
            {order.status}
          </span>

          {order.status === "Pending" && (
            <button
              className="start-btn"
              onClick={() =>
                updateStatus(
                  order._id,
                  "Out for Delivery"
                )
              }
            >
              🚚 Start Delivery
            </button>
          )}

          {order.status === "Out for Delivery" && (
            <button
              className="delivered-btn"
              onClick={() =>
                updateStatus(
                  order._id,
                  "Delivered"
                )
              }
            >
              ✓ Mark Delivered
            </button>
          )}

          {order.status === "Delivered" && (
            <span className="completed">
              ✓ Completed
            </span>
          )}

        </div>

      </div>
    );
  };

  // =========================
  // PAGE
  // =========================

  return (
    <div className="delivery-page">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="delivery-sidebar">

        {/* LOGO */}

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            🚚
          </div>

          <div>
            <h2>Fashion Store</h2>
            <p>Delivery Partner</p>
          </div>

        </div>

        {/* MENU */}

        <div className="sidebar-menu">

          <button
            className={
              activeTab === "dashboard"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() => setActiveTab("dashboard")}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </button>

          <button
            className={
              activeTab === "deliveries"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() => setActiveTab("deliveries")}
          >
            <span>📦</span>
            <span>My Deliveries</span>

            {pendingOrders.length > 0 && (
              <b className="menu-badge">
                {pendingOrders.length}
              </b>
            )}
          </button>

          <button
            className={
              activeTab === "delivered"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() => setActiveTab("delivered")}
          >
            <span>✓</span>
            <span>Delivered</span>
          </button>

          <button
            className={
              activeTab === "profile"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() => setActiveTab("profile")}
          >
            <span>👤</span>
            <span>Profile</span>
          </button>

        </div>

        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">

          <div className="online-status">
            <span className="online-dot"></span>

            <div>
              <strong>Online</strong>
              <small>Available</small>
            </div>
          </div>

          <button
            className="sidebar-logout"
            onClick={logout}
          >
            ↪ Logout
          </button>

        </div>

      </aside>

      {/* =========================
          RIGHT CONTENT
      ========================= */}

      <div className="delivery-right">

        {/* HEADER */}

        <header className="delivery-header">

          <div>
            <h2>
              {activeTab === "dashboard" &&
                "Dashboard"}

              {activeTab === "deliveries" &&
                "My Deliveries"}

              {activeTab === "delivered" &&
                "Delivered Orders"}

              {activeTab === "profile" &&
                "Profile"}
            </h2>

            <p>
              Manage your delivery activities
            </p>
          </div>

          <div className="header-user">

            <div className="header-avatar">
              🚚
            </div>

            <div>
              <strong>Delivery Partner</strong>
              <small>Active</small>
            </div>

          </div>

        </header>

        {/* =========================
            DASHBOARD
        ========================= */}

        {activeTab === "dashboard" && (
          <main className="delivery-main">

            <div className="page-title">
              <h1>Delivery Dashboard</h1>
              <p>
                Manage your assigned deliveries
                easily.
              </p>
            </div>

            {/* STATS */}

            <div className="stats-grid">

              <div className="stat-card">
                <div className="stat-icon blue">
                  📦
                </div>

                <div>
                  <span>Total Orders</span>
                  <h2>{orders.length}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">
                  ⏳
                </div>

                <div>
                  <span>Pending</span>
                  <h2>
                    {pendingOrders.length}
                  </h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple">
                  🚚
                </div>

                <div>
                  <span>Out for Delivery</span>
                  <h2>
                    {outForDeliveryOrders.length}
                  </h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">
                  ✓
                </div>

                <div>
                  <span>Delivered</span>
                  <h2>
                    {deliveredOrders.length}
                  </h2>
                </div>
              </div>

            </div>

            {/* RECENT ORDERS */}

            <section className="orders-section">

              <div className="section-header">

                <div>
                  <h2>Recent Deliveries</h2>
                  <p>
                    Latest assigned orders
                  </p>
                </div>

                <button
                  className="view-btn"
                  onClick={() =>
                    setActiveTab("deliveries")
                  }
                >
                  View All →
                </button>

              </div>

              {loading ? (
                <div className="empty-box">
                  <div>⏳</div>
                  <h3>Loading orders...</h3>
                </div>
              ) : orders.length === 0 ? (
                <div className="empty-box">
                  <div>📦</div>
                  <h3>No orders found</h3>
                  <p>
                    No orders are available.
                  </p>
                </div>
              ) : (
                <div className="recent-list">

                  {orders.slice(0, 5).map((order) => (
                    <div
                      className="recent-item"
                      key={order._id}
                    >

                      <div className="recent-icon">
                        📦
                      </div>

                      <div className="recent-details">
                        <strong>
                          Order #
                          {order._id
                            ?.slice(-6)
                            .toUpperCase()}
                        </strong>

                        <span>
                          ₹{order.totalAmount}
                        </span>
                      </div>

                      <span
                        className={getStatusClass(
                          order.status
                        )}
                      >
                        {order.status}
                      </span>

                    </div>
                  ))}

                </div>
              )}

            </section>

          </main>
        )}

        {/* =========================
            MY DELIVERIES
        ========================= */}

        {activeTab === "deliveries" && (
          <main className="delivery-main">

            <div className="page-title left">
              <h1>My Deliveries</h1>
              <p>
                Manage all assigned orders.
              </p>
            </div>

            {loading ? (
              <div className="empty-box">
                <div>⏳</div>
                <h3>Loading...</h3>
              </div>
            ) : orders.length === 0 ? (
              <div className="empty-box">
                <div>📦</div>
                <h3>No deliveries</h3>
                <p>
                  No orders are assigned.
                </p>
              </div>
            ) : (
              <div className="delivery-list">

                {orders.map((order) => (
                  <DeliveryOrder
                    key={order._id}
                    order={order}
                  />
                ))}

              </div>
            )}

          </main>
        )}

        {/* =========================
            DELIVERED
        ========================= */}

        {activeTab === "delivered" && (
          <main className="delivery-main">

            <div className="page-title left">
              <h1>Delivered Orders</h1>
              <p>
                Successfully completed deliveries.
              </p>
            </div>

            {deliveredOrders.length === 0 ? (
              <div className="empty-box">
                <div>✓</div>
                <h3>No delivered orders</h3>
                <p>
                  Delivered orders will appear here.
                </p>
              </div>
            ) : (
              <div className="delivery-list">

                {deliveredOrders.map((order) => (
                  <DeliveryOrder
                    key={order._id}
                    order={order}
                  />
                ))}

              </div>
            )}

          </main>
        )}

        {/* =========================
            PROFILE
        ========================= */}

        {activeTab === "profile" && (
          <main className="delivery-main">

            <div className="page-title left">
              <h1>Profile</h1>
              <p>
                Your delivery partner information.
              </p>
            </div>

            <div className="profile-card">

              <div className="profile-avatar">
                🚚
              </div>

              <h2>Delivery Partner</h2>

              <p>
                Active Delivery Partner
              </p>

              <div className="profile-grid">

                <div>
                  <span>Role</span>
                  <strong>
                    Delivery Partner
                  </strong>
                </div>

                <div>
                  <span>Total Orders</span>
                  <strong>
                    {orders.length}
                  </strong>
                </div>

                <div>
                  <span>Pending</span>
                  <strong>
                    {pendingOrders.length}
                  </strong>
                </div>

                <div>
                  <span>Out for Delivery</span>
                  <strong>
                    {outForDeliveryOrders.length}
                  </strong>
                </div>

                <div>
                  <span>Delivered</span>
                  <strong>
                    {deliveredOrders.length}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong className="available">
                    ● Available
                  </strong>
                </div>

              </div>

            </div>

          </main>
        )}

      </div>

    </div>
  );
}

export default DeliveryPartner;