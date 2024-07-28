const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Products = {
  getAllProducts: async (userId) => {
    const sql_product = `
      SELECT p.*, c.CategoryName
      FROM products p
      JOIN productcategories c ON p.ProductCategoryID = c.CategoryID
      WHERE p.UserID = ?
    `;
    try {
      const result = await query(sql_product, [userId]);
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
};

module.exports = Products;