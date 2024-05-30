const express = require("express");
require("dotenv").config();
const deanRouter = require("./routes/deanRoutes.js");
const cardRouter = require("./routes/cardRoutes.js");
const { connectDB } = require("./config/connectDB.js");
const cors = require("cors");
const bodyParser = require("body-parser");
connectDB();
const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/rfid-ispsc/dean", deanRouter);
app.use("/rfid-ispsc/card", cardRouter);

app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
