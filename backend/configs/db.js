const mongoose = require("mongoose");
require("dotenv").config();


const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("DATABASE is connected");
  } catch (error) {
    console.log("DATABASE is not connected");
  }
};

module.exports = connect;
