const Order = require("../models/Order");
const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

// CREATE ORDER
router.post("/", orderController.createOrder);

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
  .populate("userId", "name email address")
  .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.log("GET ORDERS ERROR:", error);

    res.status(500).json({
      message: "Failed to get orders",
      error: error.message,
    });
  }
});

// UPDATE ORDER STATUS
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    console.log("UPDATE ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
});

module.exports = router;