const { MongoClient } = require("mongodb");

const url = "mongodb://eduwork:1234@localhost:27017?authSource=admin";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
})();

const db = client.db("eduwork-native");

module.exports = db;
