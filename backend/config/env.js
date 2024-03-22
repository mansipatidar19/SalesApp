// Importing the dotenv library
const env = require("dotenv");

// env configuration 
env.config(); 

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;

// Exporting the PORT, MONGO_URI, SECRET 
module.exports = { PORT, MONGO_URI, SECRET };
