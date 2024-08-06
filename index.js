const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const mongoDB = require("./config/mongoose");
const User = require("./model/User");
const cors = require("cors");
//middleware to avoid cross plateform issue
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
//routes
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully runing on port:" + port);
    mongoDB();
  }
});
