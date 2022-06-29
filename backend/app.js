const express = require("express");
const bodyParse = require("body-parser");
const morgan = require("morgan");
const connect = require("./configs/db");
// const route = require("./routers/router");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8888;
var corsOptions = {
  origin: process.env.CLIENT,
};

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(morgan("dev"));

connect();
// route(app);
app.get("/", (req, res) => {
  res.send("This is shop app");
});

app.listen(port, () => {
  console.log("App is connected by locallhost: " + port);
});
