const express = require("express");
const router = express.Router();
const authController = require("../../v1/controllers/auth.controller");
const validateRegister = require("../middleware/validate.middleware");

router.post("/register", validateRegister, authController.authRegister);

module.exports = router;
