require("rootpath")();
var express = require("express");
var app = express();
const path = require("path");
const morgan = require("morgan");
require("dotenv").config({ path: path.join(__dirname, ".env") });
var bodyParser = require("body-parser");
var cors = require("cors");
const requestIp = require("request-ip");
app.use(morgan("dev"));
app.use(cors());
app.use(requestIp.mw());

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 50000,
  })
);
app.get("/", async (req, res) => {
  res.send("Server working fine!");
});

//An error handling middleware
app.use((err, req, res, next) => {
  res.status(400);
  res.json({ message: "Oops, something went wrong.", err });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);
  res.json({ message: "Page not found!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server has started at port: ${process.env.PORT} ..`);
});
