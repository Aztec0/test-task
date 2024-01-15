const express = require("express");
const { auth } = require("../middlewares/authMiddleware");

const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/users", auth, usersController.getUsers);

module.exports = router;
