const express = require("express");
const router = express.Router();
const authController = require("../../v1/controllers/auth.controller");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validate.middleware");

router.post("/register", validateRegister, authController.authRegister);
router.post("/login", validateLogin, authController.authLogin);

module.exports = router;
