const Products = require("../model/product.model");
const db = require("../../../config/database.config");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

module.exports.getAllProducts = async (req, res) => {
  const sort = req.query.sort;
  const page = req.query.page;
  const categoriesQuery = req.query.categories;
  const role = req.headers.role || req.query.role || ""; // Adjust based on where role is sent

  // Check if categoriesQuery is a string
  const categories =
    typeof categoriesQuery === "string" ? categoriesQuery.split(",") : [];

  try {
    const allProducts = await Products.getAllProducts(sort, categories, page);

    if (allProducts.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "No products found",
      });
    }

    // Filter products based on role
    const filteredProducts = role
      ? allProducts.filter((product) => {
          if (role === "administrator") {
            return product.Deleted === 0 && product.status === 0;
          } else {
            return product.Deleted === 0 && product.status === 1;
          }
        })
      : allProducts;

    // Shuffle products randomly
    const randomProducts = filteredProducts.sort(() => Math.random() - 0.5);

    res.status(200).json({
      code: 200,
      message: "Get all products successful",
      data: randomProducts,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

// Hàm tạo sản phẩm
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

    let ProductImageBase64 = null;
    if (req.file) {
      const filePath = req.file.path; // Đường dẫn file tạm thời
      try {
        // Chuyển file sang base64
        const fileData = await fs.readFile(filePath);
        ProductImageBase64 = `data:${
          req.file.mimetype
        };base64,${fileData.toString("base64")}`;
        await fs.unlink(filePath); // Xóa file tạm
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: "Error reading file",
        });
      }
    }

    // Kiểm tra các trường cần thiết
    const requiredFields = [
      "ProductName",
      "ProductPrice",
      "ProductWeight",
      "ProductLongDesc",
      "ProductCategoryID",
      "ProductStock",
      "UserID",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          statusCode: 400,
          message: `Missing required field: ${field}`,
        });
      }
    }

    // Tạo sản phẩm
    const create = await Products.createProducts(
      ProductID,
      ProductName,
      ProductPrice,
      ProductWeight,
      ProductLongDesc,
      ProductImageBase64, // Lưu base64
      ProductCategoryID,
      ProductStock,
      UserID
    );

    res.status(201).json({
      code: 201,
      message: "Create product successful",
      data: create,
    });
  } catch (error) {
    console.error("Error executing query:", error);
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
        UserID: productDetail.UserID,
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

module.exports.deleteProduct = async (req, res) => {
  const ProductID = req.params.id;
  const { UserID } = req.body;
  if (!UserID) {
    return res.status(404).json({
      code: 404,
      sage: "Missing required fields",
    });
  }

  try {
    const deleteP = await Products.deleteProduct(ProductID, UserID);
    if (!deleteP) {
      return res.status(404).json({
        code: 404,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      code: 200,
      message: "Delete product successfully !",
    });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  const ProductID = req.params.id;
  const {
    ProductName,
    ProductPrice,
    ProductWeight,
    ProductLongDesc,
    ProductStock,
    UserID,
  } = req.body;
  if (
    !ProductName ||
    !ProductPrice ||
    !ProductWeight ||
    !ProductLongDesc ||
    !ProductStock ||
    !UserID
  ) {
    return res.status(404).json({
      code: 404,
      sage: "Missing required fields",
    });
  }
  try {
    const update = await Products.updateProduct(
      ProductID,
      ProductName,
      ProductPrice,
      ProductWeight,
      ProductLongDesc,
      ProductStock,
      UserID
    );
    if (!update) {
      return res.status(404).json({
        code: 404,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      code: 200,
      message: "Update successfully",
    });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports.getSearchProducts = async (req, res) => {
  const { keyword } = req.query;
  "req", req.query;

  try {
    const search = await Products.getSearchProducts(keyword);
    if (search.length <= 0 || !search) {
      return res.status(400).json({
        code: 404,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      code: 200,
      message: "Successfully",
      data: search,
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
