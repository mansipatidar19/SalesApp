// Importing the required modules or model
const UserModel = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET } = require("../config/env");

// Function to handle user registration
const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Checking if all the fields are filled
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ Error: "All fields are mandotary" });
    }

    // Checking if email is already registered
    let sameEmail = await UserModel.findOne({ email });
    if (sameEmail) {
      return res
        .status(400)
        .json({ Error: "Email already registered, please login" });
    }

    // Hasing the password before storing it directly to the database
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });
    // Saving the user
    await newUser.save();
    return res.status(200).json({ Message: "Registration Successful" });
  } catch (error) {
    console.error("Error occured while registration", error);
  }
};

// Function to handle user login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Checking if all fields are filled
  if (!email || !password) {
    return res.status(400).json({ Error: "All fields are mandotary" });
  }

  // Checking the user is registered or not
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ Error: "Please register first" });
  }

  // Matching the password with the hashed password from the databse
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    // Generating a JWT token with user ID and email as payload.
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    return res
      .status(200)
      .json({ Message: "User logged-in successfully!", token, user: payload });
  } else {
    return res.status(400).json({ Error: "Please check password" });
  }
};

// Exporting the functions to use them in router
module.exports = { register, login };
