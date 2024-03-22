// Importing the required modules or models
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user_model");
const { SECRET } = require("../config/env");
// Middleware function to authorize
const authorize = async (req, res, next) => {
  try { 
    // Retrieving the authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ Error: "Please register / login first" });
    }
    // Extracting the token
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ Error: "Please register / login first" });
    }
    const decoded = jwt.verify(token, SECRET);
    const user = await UserModel.findById({ _id: decoded.id }, { password: 0 });
   // Storing the user object in the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error occured in middleware", error);
    return res.status(400).json({ Error: "Some Error Occured!" });
  }
};
// Exporting the authorize middleware function
module.exports = authorize;