// Importing the SalesModel
const SalesModel = require("../models/sales_model");

// Function to add sales data to the database.
const addSales = async (req, res) => {
  // Destructuring request body
  const { productname, quantity, amount } = req.body;
  if (!productname || !quantity || !amount) {
    return res.status(400).json({ Error: "All fields are mandatory!" });
  }

  // Retrieving the authenticated user
  const author = req.user;

  const Sales = new SalesModel({ productname, quantity, amount, author });
  const newSales = await Sales.save();

  // Returning appropriate response
  if (newSales) {
    return res.status(200).json({ Message: "Sales added!", newSales });
  } else {
    return res.status(500).json({ Error: "Error adding sales!" });
  }
};

// Function to retrieve the top sales data
const topSales = async (req, res) => {
  const authorId = req.user._id;

  // Aggregating sales data to calculate top sales for the authenticated user
  const topSalesData = await SalesModel.aggregate([
    { $match: { author: authorId } },
    {
      $addFields: {
        totalSale: {
          $multiply: ["$quantity", "$amount"],
        },
      },
    },
    { $sort: { totalSale: -1 } },
    { $limit: 5 },
  ]);
  res.status(200).json({ topSalesData });
};

// Function to calculate the total revenue
const totalRevenue = async (req, res) => {
  const authorId = req.user._id;

  // Determining the start and end of the current day.
  const today = new Date();
  const startOfDay = new Date(today.setUTCHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setUTCHours(23, 59, 59, 999));

  // Aggregating sales data to calculate the today's total revenue
  const totalRevenueData = await SalesModel.aggregate([
    {
      $match: {
        author: authorId,
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    {
      $addFields: {
        totalRevenue: {
          $multiply: ["$quantity", "$amount"],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$totalRevenue",
        },
      },
    },
  ]);

  if (totalRevenueData.length > 0) {
    return res.status(200).json({ totalRevenue: totalRevenueData[0].total });
  } else {
    return res.status(200).json({ totalRevenue: 0 });
  }
};

// Exporting the functions
module.exports = { addSales, topSales, totalRevenue };
