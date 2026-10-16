const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/Product");
const UserRoutes = require("./routes/UserRoutes");
const OrderRoutes = require("./routes/OrderRoutes");
const DeliveryPartnerRoutes = require("./routes/DeliveryPartnerRoutes");
const CouponRoutes = require("./routes/CouponRoutes");

const app = express();

const PORT = 5000;

// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());
app.use(express.json());


// ==============================
// USER ROUTES
// ==============================

app.use("/api/users", UserRoutes);


// ==============================
// DELIVERY PARTNER ROUTES
// ==============================

app.use("/api/delivery-partners", DeliveryPartnerRoutes);


// ==============================
// ORDER ROUTES
// ==============================

app.use("/api/orders", OrderRoutes);
app.use("/api/coupons", CouponRoutes);




// ==============================
// MONGODB CONNECTION
// ==============================

mongoose
  .connect("mongodb://127.0.0.1:27017/dressshop")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });


// ==============================
// GET ALL PRODUCTS
// ==============================

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      message: "Failed to get products",
      error: error.message
    });
  }
});


// ==============================
// ADD NEW PRODUCT
// ==============================

app.post("/api/products", async (req, res) => {
  try {
    const {
      name,
      price,
      discount = 0,
      image = ""
    } = req.body;

    // Check name
    if (!name) {
      return res.status(400).json({
        message: "Product name is required"
      });
    }

    // Convert price
    const priceValue = Number(price);

    if (isNaN(priceValue)) {
      return res.status(400).json({
        message: "Price must be a number"
      });
    }

    // Convert discount
    const discountValue = Number(discount) || 0;

    // Calculate final price
    const finalPrice =
      priceValue -
      (priceValue * discountValue) / 100;

    // Create product
    const product = new Product({
      name: name,
      price: priceValue,
      discount: discountValue,
      finalPrice: finalPrice,
      image: image
    });

    // Save product
    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct
    });

  } catch (error) {
    console.log("PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Product creation failed",
      error: error.message
    });
  }
});


// ==============================
// EDIT / UPDATE PRODUCT
// ==============================

app.put("/api/products/:id", async (req, res) => {
  try {
    const {
      name,
      price,
      discount = 0,
      image = ""
    } = req.body;

    const priceValue = Number(price);
    const discountValue = Number(discount) || 0;

    const finalPrice =
      priceValue -
      (priceValue * discountValue) / 100;

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          price: priceValue,
          discount: discountValue,
          finalPrice,
          image
        },
        { new: true }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      message: "Failed to update product",
      error: error.message
    });
  }
});


// ==============================
// DELETE PRODUCT
// ==============================

app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: "Failed to delete product",
      error: error.message
    });
  }
});


// ==============================
// START SERVER
// ==============================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});