const express = require("express");
const deanController = require("../controllers/deanController.js");
const { protect } = require("../middlewares/authMiddleware.js");
const deanRouter = express.Router();

deanRouter.post("/", deanController.registerDean);
deanRouter.post("/login", deanController.loginDean);
deanRouter.get("/my-account", protect, deanController.getDean);

module.exports = deanRouter;
