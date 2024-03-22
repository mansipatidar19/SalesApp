// Importing the required modules or model
const express = require("express");
const authorize = require("../middlewares/authorization");
const {
  addSales,
  topSales,
  totalRevenue,
} = require("../controllers/sales_controller");
 
// Creating an instance of the Express router 
const router = express.Router();

// Defining routes for adding sales, retrieving top sales, and calculating total revenue
router.post("/addSales", authorize, addSales);
router.get("/topSales", authorize, topSales);
router.get("/totalRevenue", authorize, totalRevenue);

// Exporting the router
module.exports = router;
