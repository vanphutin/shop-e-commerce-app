const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Cart = {
  postAddToCart: async (
    idCartItem,
    UserID,
    ProductID,
    quantity,
    size,
    notes
  ) => {
    const sql_addCart =
      "INSERT INTO cartitems(idCartItem,UserID,ProductID,quantity,size,notes) VALUE(?, ?, ?, ?, ? ,?) ";

    try {
      const result = await query(sql_addCart, [
        idCartItem,
        UserID,
        ProductID,
        quantity,
        size,
        notes,
      ]);
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  },
};

module.exports = Cart;
