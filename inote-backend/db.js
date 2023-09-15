const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017/inote";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = connectToMongo;
