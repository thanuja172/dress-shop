const express = require("express");

const router = express.Router();

const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");


// CREATE USER
router.post("/", createUser);


// GET ALL USERS
router.get("/", getUsers);


// GET USER BY ID
router.get("/:id", getUser);


// UPDATE USER BY ID
router.put("/:id", updateUser);


// DELETE USER BY ID
router.delete("/:id", deleteUser);


module.exports = router;