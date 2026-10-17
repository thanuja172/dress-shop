import { useEffect, useState } from "react";

import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaSignOutAlt,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import "./Admin.css";

const API_URL =
  import.meta.env.VITE_API_URL || "https://dress-shop-backend.vercel.app/api";

function Products({
  products,
  newProduct,
  setNewProduct,
  handleAddProduct,
  handleDeleteProduct,
}) {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Products</h1>
        <p>Manage your fashion products.</p>
      </div>

      <div className="product-layout">
        <div className="product-list">
          <h3>Available Products</h3>

          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <div className="product-row" key={product.id}>
                <div className="product-icon large">
                  <FaBoxOpen />
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>Stock: {product.stock}</p>
                </div>

                <strong>₹{product.price}</strong>

                <button
                  className="delete-button"
                  onClick={() => handleDeleteProduct(product)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="add-product-box">
          <h2>Add New Product</h2>

          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                name: e.target.value,
              })
            }
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => {
              setNewProduct((prev) => ({
                ...prev,
                price: e.target.value.replace(/\D/g, ""),
              }));
            }}
          />

          <input
            type="number"
            placeholder="Discount (%)"
            value={newProduct.discount}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                discount: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Product Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                image: e.target.value,
              })
            }
          />

          <button
            className="primary-button"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

function Admin() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const oldProducts = [
    { id: "old-1", name: "Frock", price: 999, stock: 10 },
    { id: "old-2", name: "Lehenga", price: 1999, stock: 10 },
    { id: "old-3", name: "Western Wear", price: 1499, stock: 10 },
    { id: "old-4", name: "Kurti", price: 899, stock: 10 },
    { id: "old-5", name: "Jeans", price: 799, stock: 10 },
    { id: "old-6", name: "Tops", price: 599, stock: 10 },
    { id: "old-7", name: "Tissue Saree", price: 1299, stock: 10 },
    { id: "old-8", name: "Party Wear", price: 1599, stock: 10 },
    { id: "old-9", name: "Anarkali", price: 1299, stock: 10 },
    { id: "old-10", name: "Silk Saree", price: 3999, stock: 10 },
    { id: "old-11", name: "Palazzo Set", price: 799, stock: 10 },
    { id: "old-12", name: "Half Saree", price: 1399, stock: 10 },
    { id: "old-13", name: "Straight Suit", price: 699, stock: 10 },
    { id: "old-14", name: "Ethnic Wear", price: 899, stock: 10 },
    { id: "old-15", name: "Pinafore Midi Dress", price: 999, stock: 10 },
    { id: "old-16", name: "Peplum Co-ord Set", price: 1299, stock: 10 },
    { id: "old-17", name: "Embroidered Gown", price: 1799, stock: 10 },
    { id: "old-18", name: "Indo-Western", price: 2599, stock: 10 },
    { id: "old-19", name: "Sharara Set", price: 1399, stock: 10 },
    { id: "old-20", name: "Office Wear", price: 1799, stock: 10 },
  ];

  const [products, setProducts] = useState(oldProducts);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    discount: "",
    image: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        const backendProducts = data.map((product) => ({
          id: product._id,
          name: product.name,
          price: Number(product.price || 0),
          stock: Number(product.stock || 10),
          discount: Number(product.discount || 0),
          image: product.image || "",
        }));

        setProducts([...oldProducts, ...backendProducts]);
      }
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setOrders(data);
      }
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setCustomers(data);
      }
    } catch (error) {
      console.error("FETCH USERS ERROR:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchCustomers();
  }, []);

  const handleAddProduct = async () => {
    if (!newProduct.name.trim()) {
      alert("Please enter Product Name");
      return;
    }

    if (!newProduct.price) {
      alert("Please enter Price");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: Number(newProduct.price),
          discount: Number(newProduct.discount) || 0,
          image: newProduct.image,
          stock: 10,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Product add failed");
        return;
      }

      alert("Product Added Successfully!");

      await fetchProducts();

      setNewProduct({
        name: "",
        price: "",
        discount: "",
        image: "",
      });
    } catch (error) {
      console.error("ADD PRODUCT ERROR:", error);
      alert("Backend server error");
    }
  };

  const handleDeleteProduct = async (product) => {
    if (String(product.id).startsWith("old-")) {
      alert("This is an old product and cannot be deleted.");
      return;
    }

    const confirmDelete = window.confirm(
      `Delete "${product.name}"?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/products/${product.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Product delete failed");
        return;
      }

      setProducts((prevProducts) =>
        prevProducts.filter(
          (item) => item.id !== product.id
        )
      );

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
      alert("Backend server error");
    }
  };

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum + Number(order.totalAmount || 0),
    0
  );
  const Dashboard = () => {
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>
            Welcome back! Here's what's happening with your fashion store.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <p>Total Products</p>
              <h2>{products.length}</h2>
            </div>

            <div className="stat-icon">
              <FaBoxOpen />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <p>Total Orders</p>
              <h2>{orders.length}</h2>
            </div>

            <div className="stat-icon">
              <FaShoppingBag />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <p>Total Customers</p>
              <h2>{customers.length}</h2>
            </div>

            <div className="stat-icon">
              <FaUsers />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <p>Total Revenue</p>
              <h2>₹{totalRevenue}</h2>
            </div>

            <div className="stat-icon">₹</div>
          </div>
        </div>

        <div className="dashboard-grid">

          <div className="dashboard-box">
            <div className="box-title">
              <h3>Recent Orders</h3>

              <button
                className="text-button"
                onClick={() => setActivePage("orders")}
              >
                View All
              </button>
            </div>

            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.slice(0, 5).map((order) => (
                <div
                  className="recent-order"
                  key={order._id}
                >
                  <div>
                    <strong>
                      #{order._id.slice(-6)}
                    </strong>

                    <span>
                      {order.products?.length > 0
                        ? order.products[0].name
                        : "Order"}
                    </span>
                  </div>

                  <strong>
                    ₹{Number(order.totalAmount || 0)}
                  </strong>

                  <span
                    className={`status ${String(
                      order.status || "Pending"
                    ).toLowerCase()}`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="dashboard-box">
            <div className="box-title">
              <h3>Popular Products</h3>

              <button
                className="text-button"
                onClick={() => setActivePage("products")}
              >
                View All
              </button>
            </div>

            {products.slice(0, 8).map((product) => (
              <div
                className="popular-product"
                key={product.id}
              >
                <div className="product-icon">
                  <FaBoxOpen />
                </div>

                <div>
                  <strong>{product.name}</strong>
                  <span>
                    {product.stock} in stock
                  </span>
                </div>

                <strong>
                  ₹{product.price}
                </strong>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  };

  const Orders = () => {
    return (
      <div className="page-content">

        <div className="page-header">
          <h1>Customer Orders</h1>
          <p>
            View and manage all customer orders.
          </p>
        </div>

        <div className="orders-grid">

          {orders.length === 0 ? (
            <div className="dashboard-box">
              <h3>No orders found</h3>

              <p>
                Orders placed by customers will appear here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                className="order-card"
                key={order._id}
              >

                <div className="order-top">
                  <h3>
                    Order #{order._id.slice(-6)}
                  </h3>

                  <span
                    className={`status ${String(
                      order.status || "Pending"
                    ).toLowerCase()}`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>

                <div className="order-details">

                  <p>
                    <b>Customer</b>

                    {order.userId?.name ||
                      order.user?.name ||
                      "Customer"}
                  </p>

                  <p>
                    <b>Products</b>
                    {order.products?.length || 0}
                  </p>

                  <p>
                    <b>Quantity</b>

                    {order.products?.reduce(
                      (total, product) =>
                        total +
                        Number(product.quantity || 1),
                      0
                    ) || 0}
                  </p>

                  <p>
                    <b>Amount</b>
                    ₹{Number(order.totalAmount || 0)}
                  </p>

                </div>

                <button
                  className="view-button"
                  onClick={() =>
                    setSelectedOrder(order)
                  }
                >
                  View Order
                </button>

              </div>
            ))
          )}

        </div>

        {selectedOrder && (
          <div className="modal-overlay">

            <div className="order-modal">

              <button
                className="close-button"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                <FaTimes />
              </button>

              <div className="modal-header">

                <h2>
                  Order #
                  {selectedOrder._id.slice(-6)}
                </h2>

                <span
                  className={`status ${String(
                    selectedOrder.status || "Pending"
                  ).toLowerCase()}`}
                >
                  {selectedOrder.status || "Pending"}
                </span>

              </div>

              <div className="customer-section">

                <h3>
                  Customer Information
                </h3>

                <p>
                  <b>Name:</b>{" "}
                  {selectedOrder.userId?.name ||
                    selectedOrder.user?.name ||
                    "Customer"}
                </p>

                <p>
                  <b>Email:</b>{" "}
                  {selectedOrder.userId?.email ||
                    selectedOrder.user?.email ||
                    "Not available"}
                </p>

                <p>
                  <b>Address:</b>{" "}
                  {selectedOrder.address ||
                    "Not available"}
                </p>

              </div>

              <div className="customer-section">

                <h3>Products</h3>

                {selectedOrder.products?.map(
                  (product, index) => (
                    <div
                      className="order-product"
                      key={index}
                    >

                      <span>
                        {product.name}
                      </span>

                      <span>
                        {product.quantity} × ₹
                        {product.price}
                      </span>

                    </div>
                  )
                )}

              </div>

              <div className="modal-total">

                <strong>Total</strong>

                <strong>
                  ₹
                  {Number(
                    selectedOrder.totalAmount || 0
                  )}
                </strong>

              </div>

            </div>
          </div>
        )}

      </div>
    );
  };

  const Customers = () => {
    return (
      <div className="page-content">

        <div className="page-header">
          <h1>Customers</h1>
          <p>
            View all registered customers.
          </p>
        </div>

        <div className="customers-grid">

          {customers.length === 0 ? (
            <div className="dashboard-box">
              <h3>No customers found</h3>

              <p>
                Registered customers will appear here.
              </p>
            </div>
          ) : (
            customers.map((customer) => (
              <div
                className="customer-card"
                key={customer._id}
              >

                <div className="customer-avatar">
                  <FaUsers />
                </div>

                <div className="customer-info">
                  <h3>
                    {customer.name || "Customer"}
                  </h3>

                  <p>
                    {customer.email || "No email"}
                  </p>
                </div>

                <button
                  className="view-button"
                  onClick={() =>
                    setSelectedCustomer(customer)
                  }
                >
                  View
                </button>

              </div>
            ))
          )}

        </div>

        {selectedCustomer && (
          <div className="modal-overlay">

            <div className="order-modal">

              <button
                className="close-button"
                onClick={() =>
                  setSelectedCustomer(null)
                }
              >
                <FaTimes />
              </button>

              <div className="modal-header">
                <h2>
                  Customer Details
                </h2>
              </div>

              <div className="customer-section">

                <p>
                  <b>Name:</b>{" "}
                  {selectedCustomer.name ||
                    "Not available"}
                </p>

                <p>
                  <b>Email:</b>{" "}
                  {selectedCustomer.email ||
                    "Not available"}
                </p>

              </div>

            </div>
          </div>
        )}

      </div>
    );
  };

  const Offers = () => {
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [message, setMessage] = useState("");

    const handleAddCoupon = async () => {
      if (!couponCode.trim()) {
        alert("Please enter coupon code");
        return;
      }

      if (!discount) {
        alert("Please enter discount");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/coupons`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: couponCode,
            discount: Number(discount),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Coupon creation failed");
          return;
        }

        setMessage("Coupon added successfully!");

        setCouponCode("");
        setDiscount("");

        alert("Coupon added successfully!");
      } catch (error) {
        console.error("ADD COUPON ERROR:", error);
        alert("Backend server error");
      }
    };

    return (
      <div className="page-content">
        <div className="page-header">
          <h1>Offers & Coupons</h1>
          <p>Create discount coupons for customers.</p>
        </div>

        <div className="add-product-box">
          <h2>Create New Coupon</h2>

          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) =>
              setCouponCode(e.target.value.toUpperCase())
            }
          />

          <input
            type="number"
            placeholder="Discount (%)"
            value={discount}
            onChange={(e) =>
              setDiscount(e.target.value)
            }
          />

          <button
            className="primary-button"
            onClick={handleAddCoupon}
          >
            Create Coupon
          </button>

          {message && (
            <p style={{ marginTop: "15px" }}>
              {message}
            </p>
          )}
        </div>
      </div>
    );
  };

  const handleLogout = async () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "/admin-login";
  };

  return (
    <div className="admin-container">

      <aside className="admin-sidebar">

        <div className="admin-logo">
          <h2>Fashion Admin</h2>
        </div>

        <nav className="admin-nav">

          <button
            className={
              activePage === "dashboard"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("dashboard")}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </button>

          <button
            className={
              activePage === "products"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("products")}
          >
            <FaBoxOpen />
            <span>Products</span>
          </button>

          <button
            className={
              activePage === "orders"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("orders")}
          >
            <FaShoppingBag />
            <span>Orders</span>
          </button>

          <button
            className={
              activePage === "customers"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("customers")}
          >
            <FaUsers />
            <span>Customers</span>
          </button>

          <button
            className={
              activePage === "offers"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("offers")}
          >
            <FaShoppingBag />
            <span>Offers</span>
          </button>

        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </aside>

      <main className="admin-main">

        {activePage === "dashboard" && (
          <Dashboard />
        )}

        {activePage === "products" && (
          <Products
            products={products}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            handleAddProduct={handleAddProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        )}

        {activePage === "orders" && (
          <Orders />
        )}

        {activePage === "customers" && (
          <Customers />
        )}

        {activePage === "offers" && (
          <Offers />
        )}

      </main>

    </div>
  );
}

export default Admin;