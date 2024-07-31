const Products = require("../model/product.model");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

module.exports.getAllProducts = async (req, res) => {
  const sort = req.query.sort;
  const page = req.query.page;
  const categoriesQuery = req.query.categories;
  // Kiểm tra nếu categoriesQuery là chuỗi
  const categories =
    typeof categoriesQuery === "string" ? categoriesQuery.split(",") : [];

  try {
    const allProducts = await Products.getAllProducts(sort, categories, page);

    if (allProducts.length === 0) {
      return res.json({
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

module.exports.createProducts = async (req, res) => {
  const ProductID = uuidv4();
  try {
    const {
      ProductName,
      ProductPrice,
      ProductWeight,
      ProductLongDesc,

      ProductCategoryID,
      ProductStock,
      UserID,
    } = req.body;

    let { ProductImage } = req.body;
    if (req.file) {
      const imagePath = req.file.path;
      const imageData = fs.readFileSync(imagePath);
      ProductImage = imageData.toString("base64"); // Convert to base64 string
    }

    if (
      !ProductName ||
      !ProductPrice ||
      !ProductWeight ||
      !ProductLongDesc ||
      !ProductImage ||
      !ProductCategoryID ||
      !ProductStock ||
      !UserID
    ) {
      return res.status(404).json({
        code: 404,
        sage: "Missing required fields",
      });
    }
    const create = await Products.createProducts(
      ProductID,
      ProductName,
      ProductPrice,
      ProductWeight,
      ProductLongDesc,
      ProductImage,
      ProductCategoryID,
      ProductStock,
      UserID
    );
    res.status(201).json({
      code: 201,
      message: "Create  product successful",
      data: create,
    });
  } catch (error) {
    console.log("Error executing query:", error);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

module.exports.getDetailProducts = async (req, res) => {
  try {
    const productDetail = await Products.getDetailProducts(req?.params.id);
    if (!productDetail) {
      return res.status(404).json({
        code: 404,
        message: "Product not found",
      });
    }
    console.log("productDetail", productDetail);
    res.status(200).json({
      code: 200,
      message: "Get product success",
      data: {
        ProductID: productDetail?.ProductID,
        ProductName: productDetail.ProductName,
        ProductPrice: productDetail.ProductPrice,
        ProductWeight: productDetail.ProductWeight,
        ProductImage: productDetail.ProductImage,
        ProductCategoryID: productDetail.ProductCategoryID,
        ProductStock: productDetail.ProductStock,
        ProductLongDesc: productDetail.ProductLongDesc,
        userCity: productDetail.userCity,
        UserName: productDetail.UserName,
        createdAt: productDetail.createdAt,
        updatedAt: productDetail.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching product:", err);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
