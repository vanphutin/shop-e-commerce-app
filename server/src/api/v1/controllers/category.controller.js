const Categories = require("../model/category.model");
const { v4: uuidv4 } = require("uuid");
const db = require("../../../config/database.config");

module.exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await Categories.getAllCategories();
    res.status(200).json({
      code: 200,
      message: "Get all categories successful",
      data: allCategories,
    });
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

module.exports.createCategory = async (req, res) => {
  const CategoryID = uuidv4();

  try {
    const { CategoryName } = req.body;
    const check = await Categories.checkCategoryName(CategoryName);
    if (check) {
      return res.status(400).json({
        code: 400,
        message: "Category name already exists",
      });
    }
    if (!CategoryName) {
      return res.status(400).json({
        code: 400,
        message: "Category name is required",
      });
    }
    const newCategory = await Categories.createCategory(
      CategoryID,
      CategoryName
    );
    res.status(201).json({
      code: 201,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
