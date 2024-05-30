const express = require("express");
const cardController = require("../controllers/cardController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const cardRoutes = express.Router();

cardRoutes.get("/getCard", cardController.getCard);

cardRoutes.put("/updateCard/:id", cardController.updateCard);
cardRoutes.post("/createCard", cardController.createCard);
cardRoutes.delete("/deleteCard/:id", cardController.deleteCard);

//post a card data from adruino to db
cardRoutes.post("/checkCard", cardController.checkCard);

//get a card data from db to adruino
cardRoutes.get("/getCardInfo", cardController.getCardInfo);

//update card info
cardRoutes.put("/updateCardArduino/:card_id", cardController.updateCardArduino);
module.exports = cardRoutes;
