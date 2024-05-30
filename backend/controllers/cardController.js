const asyncHandler = require("express-async-handler");
const Card = require("../models/cardModel.js");

//@desc     get card info
//@route    get /rfid-ispsc/card/getCard
//@access   private
const getCard = asyncHandler(async (req, res) => {
  //return whole card info

  const card = await Card.find();

  //but if it has a card in the database we can now return the whole info of card
  res.status(200).send(card);
});

//@desc     update card info
//@route    update /rfid-ispsc/card/updateCard/:id
//@access   private
const updateCard = asyncHandler(async (req, res) => {
  //get data from request body first
  const { card_id, card_user } = req.body;

  //check data if has value
  if (!card_id || !card_user) {
    res.status(400).json({ message: "Please fill input fields" });
  }

  //get the data from data base
  const card = await Card.findById(req.params.id);

  //check the card id if we have that
  if (!card) {
    res.status(400).json({ message: `No ${card._id} is found` });
  }

  // Update the card info
  card.card_id = card_id;
  card.card_user = card_user;
  card.card_status = "Offline";
  await card.save();

  res.status(200).json({ message: `The user id ${card_id} is now updated` });
});

//@desc   create new card
//@route  create /rfid-ispsc/card/createCard
//@access private
const createCard = asyncHandler(async (req, res) => {
  //get data from request body
  const { card_id, card_user } = req.body;

  //validate data
  if (!card_id || !card_user) {
    res.status(400).json({ message: "Please Fill in all fields" });
  }

  //check card duplication based on card_id
  const cardExist = await Card.findOne({ card_id });

  //validate if card_id already exist
  if (cardExist) {
    return res
      .status(400)
      .json({ message: `${cardExist.card_id} already exist` });
  }

  //now lets create a new card
  const card = await Card.create({
    card_id,
    card_user,
    card_status: "Offline",
  });

  if (card) {
    console.log("Card Account Successfully Crreated");
    return res
      .status(200)
      .json({ message: `Card id ${card.card_id} Successfully Created` });
  } else {
    console.log("Card not created pls try again");
    return res.status(400).json({ message: "Invalid card Info" });
  }
});

//@desc     delete card by req.params.id
//@routes   deleteCard /rfid-ispsc/deleteCard:id
//@access   private
const deleteCard = asyncHandler(async (req, res) => {
  //get req.params.id from req
  const { id } = req.params;

  //now find that id in the card collections
  const foundCard = await Card.findById(id);

  //if found card id we can now do the delete
  if (!foundCard) {
    res.status(400).json({ message: `Card id: ${id} is not found` });
  }

  console.log(foundCard);

  //if found
  const deleteCard = await Card.deleteOne({ _id: id });
  res.json({
    message: `Card id: ${id} has been deleted successfully`,
  });
});

//@desc     post to check card
//@routes   checkCard /rfid-ispsc/checkCard
//@access   private
const checkCard = asyncHandler(async (req, res) => {
  //get data from request first
  const { card_id, card_user } = req.body;

  //validate the card first
  if (!card_id || !card_user) {
    res.status(400).json({ message: "Need id and user" });
  }

  //get the data from db card_id and card_user
  const useCard = await Card.findOne({ card_id, card_user });

  //check if card used is not regietered
  if (!useCard) {
    res.status(200).json({ message: `Id ${card_id} has not been registered` });
  } else {
    res.status(200).json({ message: `Id ${card_id} is now active` });
  }
});

//@desc     get card to db from adruino
//@routes   getCardInfo /rfid-ispsc/getCardInfo
//@access   private
const getCardInfo = asyncHandler(async (req, res) => {
  //get the data from req body
  const { card_id, card_user } = req.body;

  //validate data
  if (!card_id || !card_user) {
    res.status(400).json({ message: "No id found" });
  }

  //else if found get the info
  const card = await Card.findOne({ card_id, card_user });

  //if found
  if (card) {
    res.status(200).json({ message: `${card_id} is now active` });
  } else {
    res.status(400).json({ message: "Id is not active" });
  }
});

//update card when posting
const updateCardArduino = asyncHandler(async (req, res) => {
  const { card_id, card_user, card_status } = req.body;

  //check data if has value
  if (!card_id || !card_user || !card_status) {
    res.status(400).json({ message: "Please fill input fields" });
  }

  //get the data from data base
  const card = await Card.findOne({ card_id });

  //check the card id if we have that
  if (!card) {
    res.status(400).json({ message: `No ${card_id} is found` });
  }

  // Update the card info
  card.card_user = card_user;
  card.card_status = card_status;
  await card.save();

  console.log(card_status);
  console.log(card_user);
  console.log(card_id);

  res.status(200).json({ message: `User ${card_user} is ${card_status}` });
});

module.exports = {
  getCard,
  updateCard,
  createCard,
  deleteCard,
  checkCard,
  getCardInfo,
  updateCardArduino,
};
