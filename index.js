require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const responseReturn = require("./response");
const client = require("./db/connection");
const app = express();
const port = process.env.PORT;
const format = require("date-fns/format");
const waktu = format(new Date(), "yyyy-MM-dd");
const path = require("path");
const router = express.Router({ mergeParams: true });
client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});

app.use(
  bodyParser.json({
    extended: true,
    limit: "20mb",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "20mb",
  })
);

console.log(__dirname);
app.use(cors());
app.use("/user", require("./routes/users"));
app.use("/aplikasi", require("./routes/aplikasi"));
app.use("/logo", express.static(__dirname + "/assets"));
app.get("/", (req, res) => {
  res.json("Welcome in SIM PSTI");
});

console.log(waktu);
app.listen(port, () => {
  console.log(`Engines started at ${port}.`);
});
