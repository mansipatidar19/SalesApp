// Importing the required modules
const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");
 
// Function to connect & check connection of MongoDB
function databaseConfig() {
  mongoose.connect(MONGO_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connection established with database!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error occured while connecting to database", err);
  });
} 

// Exporting the database configuration function
module.exports = databaseConfig;
