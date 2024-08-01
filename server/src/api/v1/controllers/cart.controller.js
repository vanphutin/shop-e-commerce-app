const Cart = require("../model/cart.model");
const db = require("../../../config/database.config");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

module.exports.postAddToCart = async (req, res) => {
  const idCartItem = uuidv4();
  const { UserID, ProductID, quantity, size, notes } = req.body;

  // Check for missing fields
  if (!UserID || !ProductID || !quantity || !size || !notes) {
    return res.status(400).json({
      code: 400,
      message: "Missing required fields",
    });
  }

  try {
    // Check if the product already exists in the user's cart
    const [existingCartItem] = await query(
      "SELECT * FROM cartitems WHERE UserID = ? AND ProductID = ?",
      [UserID, ProductID]
    );

    if (existingCartItem) {
      // If the item already exists, update the quantity instead of inserting
      const newQuantity = +quantity + existingCartItem.quantity;
      await db.query(
        "UPDATE cartitems SET quantity = ?, size = ?, notes = ? WHERE idCartItem = ?",
        [newQuantity, size, notes, existingCartItem.idCartItem]
      );

      return res.status(200).json({
        code: 200,
        message: "Product quantity updated successfully",
      });
    } else {
      // Insert a new item into the cart
      const addCart = await Cart.postAddToCart(
        idCartItem,
        UserID,
        ProductID,
        quantity,
        size,
        notes
      );

      return res.status(201).json({
        code: 201,
        message: "Product added to cart successfully",
      });
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
