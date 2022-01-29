const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//config dotenv
dotenv.config();

const app = express();

// create mongo mongoose instance and connect to the local DB
const mongoDB = process.env.MONGODB_URI;
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

// express routes

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", require("./routes/auth-routes"));
app.use("/api/users", require("./routes/user-routes"));

// listen server on port 5000
app.listen(process.env.APP_PORT || 5000, () => {
  console.log(`listening on port ${process.env.APP_PORT}`);
});
