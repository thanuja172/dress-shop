const express = require("express");
const Coupon = require("../models/Coupon");

const router = express.Router();

// =========================
// CREATE COUPON - ADMIN
// =========================

router.post("/", async (req, res) => {
  try {
    const { code, discount } = req.body;

    if (!code || !discount) {
      return res.status(400).json({
        message: "Coupon code and discount are required",
      });
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      discount: Number(discount),
    });

    const savedCoupon = await coupon.save();

    res.status(201).json({
      message: "Coupon added successfully",
      coupon: savedCoupon,
    });

  } catch (error) {
    console.log("COUPON ERROR:", error);

    res.status(500).json({
      message: "Failed to add coupon",
      error: error.message,
    });
  }
});

// =========================
// VALIDATE COUPON - CHECKOUT
// =========================

router.post("/validate", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        message: "Coupon code is required",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Invalid or inactive coupon",
      });
    }

    res.json({
      message: "Coupon applied successfully",
      coupon: coupon,
    });

  } catch (error) {
    console.log("COUPON VALIDATION ERROR:", error);

    res.status(500).json({
      message: "Failed to validate coupon",
      error: error.message,
    });
  }
});

module.exports = router;