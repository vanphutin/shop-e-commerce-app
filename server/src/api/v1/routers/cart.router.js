const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");

router.post("/add", CartController.postAddToCart);

module.exports = router;
