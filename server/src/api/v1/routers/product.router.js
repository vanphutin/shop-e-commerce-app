const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const uploadProduct = require("../middleware/uploadProduct");

router.get("/", productController.getAllProducts);
router.get("/detail/:id", productController.getDetailProducts);
router.post("/create", uploadProduct, productController.createProducts);
router.post("/is-heart/:id", productController.isHeart);

module.exports = router;
