const express = require("express");
const router = express.Router();
const multer = require("multer");
// const upload = multer({ dest: "./uploads/" });

const userController = require("../controllers/user.controller");
const uploadUser = require("../middleware/uploadUser");

router.patch("/register-seller", uploadUser, userController.registerSeller);
router.get("/", userController.getAllUsers);

module.exports = router;
