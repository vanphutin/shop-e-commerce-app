// model/category.model.js
const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Categories = {
  getAllCategories: async () => {
    const sql_categories = "SELECT * FROM productcategories";
    try {
      const result = await query(sql_categories);
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  },
  createCategory: async (CategoryID, CategoryName) => {
    const sql_create =
      "INSERT INTO productcategories (CategoryID, CategoryName) VALUES (?,?)";
    try {
      const result = await query(sql_create, [CategoryID, CategoryName]);
      return result;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },
};

module.exports = Categories;
