import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";
import Home from "./Home";

import Cart from "./Cart";
import Wishlist from "./Wishlist";
import Profile from "./Profile";
import OrderSuccess from "./OrderSuccess";
import DeliveryPartner from "./DeliveryPartner";
import Checkout from "./Checkout";
import Payment from "./Payment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-success" element={<OrderSuccess/>} />
        <Route path="/delivery-partner" element={<DeliveryPartner />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />

        {/* ITHU KADASIYA IRUKKANUM */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;