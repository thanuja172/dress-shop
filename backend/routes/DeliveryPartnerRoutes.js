const express = require("express");
const router = express.Router();

const DeliveryPartner = require("../models/DeliveryPartner");

// GET ALL DELIVERY PARTNERS
router.get("/", async (req, res) => {
  try {
    const partners = await DeliveryPartner.find().sort({
      createdAt: -1,
    });

    res.json(partners);
  } catch (error) {
    console.error(
      "GET DELIVERY PARTNERS ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to get delivery partners",
      error: error.message,
    });
  }
});

module.exports = router;