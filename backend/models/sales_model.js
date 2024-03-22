// Importing the mongoose library
const mongoose = require("mongoose");

// Extracting the ObjectId data type
const { ObjectId } = mongoose.Schema.Types;

// Defining the schema for sales data
const salesSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
    }, 
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    author: {
      type: ObjectId, // Reference to the author
      ref: "UserModel", // Reference to the UserModel
    },
  },
  { timestamps: true } // Adding timestamps to track creation and modification times
);

// Creating a model named "SalesModel" based on the salesSchema
const SalesModel = mongoose.model("SalesModel", salesSchema);

// Exporting the SalesModel
module.exports = SalesModel;
