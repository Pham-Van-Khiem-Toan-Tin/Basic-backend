const express = require("express");
const morgan = require("morgan");
const connect = require("./configs/db");
const cookieParser =require('cookie-parser');
const cors = require("cors");

const app = express();
require("dotenv").config();

const port = process.env.PORT || 8888;
var corsOptions = {
  origin: process.env.CLIENT,
};

const authRouter = require('./routers/auth');
const categoryRouter = require('./routers/categories');
const productRouter = require('./routers/products');
const braintreeRouter = require('./routers/braintree');
const customizeRouter = require('./routers/customize');
const orderRouter = require('./routers/orders');
const userRouter = require('./routers/users');
const CreateAllFolder = require("./configs/uploadFolderCreateScript");


CreateAllFolder();

connect();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.listen(port, () => {
  console.log("App is connected by locallhost: " + port);
});
