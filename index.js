const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const mongoDB = require("./config/mongoose");
const User = require("./model/User");
//middleware to avoid cross plateform issue
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
  );
  next();
});
app.use(bodyParser.json());
//routes
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));

app.get("/", async (req, res) => {
  res.send("hii");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully runing on port:" + port);
    mongoDB();
  }
});
