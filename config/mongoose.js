const mongoose = require("mongoose");
mongoose.connect("mongodb://eduwork:1234@localhost:27017/eduwork-native?authSource=admin");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to Mongoose successfully");
});
