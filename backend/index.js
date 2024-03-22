// Importing the required modules and routes
const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/env");
const databaseConfig = require("./config/db");
const userRouter = require("./routes/user_route");
const salesRouter = require("./routes/sales_route"); 

// Creating an instance of the Expres
const app = express();

// Configuring the dtabase
databaseConfig();

// Adding the essential middlewares
app.use(express.json()); 
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/sales", salesRouter);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
