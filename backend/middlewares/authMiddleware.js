const asyncHandler = require("express-async-handler");
const Dean = require("../models/deanModel.js");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token if it has the user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from the dean
      req.dean = await Dean.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

module.exports = {
  protect,
};
