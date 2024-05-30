const asyncHandler = require("express-async-handler");
const Dean = require("../models/deanModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//@decs   register dean
//@route  post /rfid-ispsc/dean/
//@access public
const registerDean = asyncHandler(async (req, res, next) => {
  // Get data from request body
  const { email, firstname, lastname, department, password } = req.body;

  // Validate data
  if (!email || !firstname || !lastname || !department || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // Check dean account duplication based on role for department
  let deanDepartmentExist = await Dean.findOne({ department });

  if (deanDepartmentExist) {
    console.log("Dean account duplication");
    console.log(deanDepartmentExist.department);
    return res.status(400).json({
      message: `The department of ${deanDepartmentExist.department} has already a dean account `,
    });
  }

  //hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create dean account
  const dean = await Dean.create({
    email,
    firstname,
    lastname,
    department,
    password: hashPassword,
  });

  if (dean) {
    console.log("Dean account successfully created");
    return res.status(200).json({
      _id: dean.id,
      firstname: dean.firstname,
      lastname: dean.lastname,

      department: dean.department,
      token: generateToken(dean._id),
    });
    console.log(dean);
  } else {
    console.log("Dean account not created");
    return res.status(400).json({ message: "Invalid credentials" });
  }
});

//@decs   login dean
//@route  post /rfid-ispsc/dean/login
//@access public
const loginDean = asyncHandler(async (req, res) => {
  //get data from body request
  const { email, password, department } = req.body;

  //validate data first
  if (!email || !password || !department) {
    return res.status(401).json({ message: "please fill in all fields" });
  }

  //now find the account
  const dean = await Dean.findOne({ email, department });

  if (dean && (await bcrypt.compare(password, dean.password))) {
    console.log("login successfully");
    return res.status(200).json({
      _id: dean.id,
      firstname: dean.firstname,
      lastname: dean.lastname,
      email: dean.email,
      token: generateToken(dean._id),
      department: dean.department,
    });
  } else {
    return res.status(400).json({ message: "invalid credentials" });
  }
});

//@decs   get dean
//@route  get /rfid-ispsc/dean/my-account
//@access private
const getDean = asyncHandler(async (req, res) => {
  //return all info of dean
  res.status(200).json(req.dean);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  registerDean,
  loginDean,
  getDean,
};
