const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // ==============================
    // CUSTOMER
    // ==============================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ==============================
    // PRODUCTS
    // ==============================
    products: [
      {
        productId: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],

    // ==============================
    // TOTAL AMOUNT
    // ==============================
    totalAmount: {
      type: Number,
      required: true,
    },

    // ==============================
    // ORDER STATUS
    // ==============================
    status: {
      type: String,

      enum: [
        "Pending",
        "Out for Delivery",
        "Delivered",
      ],

      default: "Pending",
    },

    // ==============================
    // DELIVERY ADDRESS
    // ==============================
    address: {
      type: String,
      default: "",
    },
  },

  // ==============================
  // CREATED / UPDATED TIME
  // ==============================
  {
    timestamps: true,
  }
);

// ==============================
// EXPORT MODEL
// ==============================

module.exports = mongoose.model(
  "Order",
  orderSchema
);