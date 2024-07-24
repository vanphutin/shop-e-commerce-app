const Products = require("../model/product.model");

module.exports.getAllProducts = async (req, res) => {
  try {
    const { id } = req.query; // Lấy id từ tham số truy vấn

    if (!id) {
      return res.status(400).json({
        code: 400,
        message: "User ID is required",
      });
    }

    const allProducts = await Products.getAllProducts(id);
    // console.log("allProducts", allProducts);

    if (allProducts.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "No products found",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Get all products successful",
      data: allProducts,
    });
  } catch (error) {
    console.log("Error executing query:", error);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
