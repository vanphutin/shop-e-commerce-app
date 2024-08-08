const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const uploadProduct = require("../middleware/uploadProduct");

router.get("/", productController.getAllProducts);
router.patch("/delete/:id", productController.deleteProduct);
router.post("/create", uploadProduct, productController.createProducts);
router.get("/detail/:id", productController.getDetailProducts);

module.exports = router;
