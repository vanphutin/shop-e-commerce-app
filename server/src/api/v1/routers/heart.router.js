const express = require("express");
const router = express.Router();
const heartController = require("../controllers/heart.controller");

router.post("/is-heart/:id", heartController.isHeart);

module.exports = router;
