const express = require("express");
const router = express.Router();

const { createUser, getAllUsers , getUserById, updateUserById, deleteUserById} = require("../controller/UserController.js");

// POST /api/users/create
router.post("/create", createUser);
router.get("/allUsers", getAllUsers);
router.get("/:id",getUserById);

router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
