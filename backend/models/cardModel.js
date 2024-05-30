const mongoose = require("mongoose");

const cardSchema = mongoose.Schema(
  {
    card_id: {
      type: String,
      required: [true, "Please add a number"],
      unique: true,
    },
    card_user: {
      type: String,
      required: [true, "Please add a user"],
    },
    card_status: {
      type: String,
      required: [true, "please add status"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Card = mongoose.model("Card", cardSchema);
