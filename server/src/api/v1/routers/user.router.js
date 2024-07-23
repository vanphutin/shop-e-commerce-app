const express = require("express");
const router = express.Router();
const multer = require("multer");
// const upload = multer({ dest: "./uploads/" });

const userController = require("../controllers/user.controller");
const upload = require("../middleware/upload");

router.patch("/register-seller", upload, userController.registerSeller);

module.exports = router;
