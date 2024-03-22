// Importing the required modules or model
const express = require("express");
const { register, login } = require("../controllers/user_controller");

// Creating an instance of the Express router
const router = express.Router();
 
// Defining the Login and Register routes
router.post("/register", register);
router.post("/login", login);

// Exporting the user router
module.exports = router;
