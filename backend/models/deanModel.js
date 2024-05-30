const mongoose = require("mongoose");

const deanSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
    },
    firstname: {
      type: String,
      required: [true, "Please add firstname"],
    },
    lastname: {
      type: String,
      required: [true, "Please add lastname"],
    },
    department: {
      type: String,
      required: [true, "Please select which department"],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Dean = mongoose.model("Dean", deanSchema);
