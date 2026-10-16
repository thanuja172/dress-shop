const User = require("../models/User");


// ==============================
// CREATE USER
// ==============================

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    // Check name
    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    // Check email
    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    // Check password
    if (!password) {
      return res.status(400).json({
        message: "Password is required"
      });
    }

    // Create user
    const user = new User({
      name: name,
      email: email,
      password: password
    });

    // Save user
    const savedUser = await user.save();

    res.status(201).json({
      message: "User added successfully",
      user: savedUser
    });

  } catch (error) {
    console.log("CREATE USER ERROR:", error);

    res.status(500).json({
      message: "User creation failed",
      error: error.message
    });
  }
};


// ==============================
// GET ALL USERS
// ==============================

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);

  } catch (error) {
    console.log("GET USERS ERROR:", error);

    res.status(500).json({
      message: "Failed to get users",
      error: error.message
    });
  }
};


// ==============================
// GET USER BY ID
// ==============================

const getUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {
    console.log("GET USER ERROR:", error);

    res.status(500).json({
      message: "Failed to get user",
      error: error.message
    });
  }
};


// ==============================
// UPDATE USER
// ==============================

const updateUser = async (req, res) => {
  try {
    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.log("UPDATE USER ERROR:", error);

    res.status(500).json({
      message: "Failed to update user",
      error: error.message
    });
  }
};


// ==============================
// DELETE USER
// ==============================

const deleteUser = async (req, res) => {
  try {
    const user =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User deleted successfully"
    });

  } catch (error) {
    console.log("DELETE USER ERROR:", error);

    res.status(500).json({
      message: "Failed to delete user",
      error: error.message
    });
  }
};


// ==============================
// EXPORT
// ==============================

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};