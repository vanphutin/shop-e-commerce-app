const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Products = {
  getAllProducts: async (sort, categories, page) => {
    const PAGE_SIZE = 8;
    let sql_product = `
      SELECT p.*, c.CategoryName
      FROM products p
      JOIN productcategories c ON p.ProductCategoryID = c.CategoryID
    `;

    // Handle Category filtering
    if (categories.length > 0) {
      sql_product += ` WHERE c.CategoryName IN (${categories
        .map(() => "?")
        .join(",")})`;
    }

    // Handle Sorting
    if (sort === "asc") {
      sql_product += ` ORDER BY p.ProductPrice ASC`;
    } else if (sort === "desc") {
      sql_product += ` ORDER BY p.ProductPrice DESC`;
    }

    // Handle pagination
    let params = categories; // Initialize params with categories
    if (page) {
      page = parseInt(page); // Convert from string to int
      let skipPage = (page - 1) * PAGE_SIZE;
      sql_product += ` LIMIT ? OFFSET ?`;
      params = [...params, PAGE_SIZE, skipPage];
    } else {
      sql_product;
    }

    try {
      const result = await query(sql_product, params);
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  },
  createProducts: async (
    ProductID,
    ProductName,
    ProductPrice,
    ProductWeight,
    ProductLongDesc,
    ProductImage,
    ProductCategoryID,
    ProductStock,
    UserID
  ) => {
    const sql_create = `
      INSERT INTO products (
        ProductID, 
        ProductName, 
        ProductPrice, 
        ProductWeight, 
        ProductLongDesc, 
        ProductImage, 
        ProductCategoryID, 
        ProductStock, 
        UserID
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const result = await query(sql_create, [
        ProductID,
        ProductName,
        ProductPrice,
        ProductWeight,
        ProductLongDesc,
        ProductImage,
        ProductCategoryID,
        ProductStock,
        UserID,
      ]);
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  },
  getDetailProducts: async (id) => {
    const sql_detail = `
      SELECT p.*, u.userCity, u.UserName 
      FROM products p 
      JOIN users u ON p.UserID = u.UserID 
      WHERE ProductID = ?`;
    try {
      const result = await query(sql_detail, [id]);
      return result[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  },
  isHeart: async (id, isHeartValue) => {
    const sql_isHeart = "UPDATE products SET isHeart = ? WHERE ProductID = ?";
    try {
      const result = await query(sql_isHeart, [isHeartValue, id]);
      console.log(`Updated ${result.affectedRows} row(s).`);
      return result.affectedRows > 0; // Return true if at least one row was updated
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  },
};

module.exports = Products;
