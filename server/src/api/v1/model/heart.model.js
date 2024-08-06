const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Heart = {
  isHeart: async (idHeart, ProductID, UserID) => {
    const sql_isHeart =
      "INSERT INTO heartitems(idHeart, ProductID, UserID) VALUE(?, ?, ?)";
    try {
      const result = await query(sql_isHeart, [idHeart, ProductID, UserID]);
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  },
};

module.exports = Heart;
