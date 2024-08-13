const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Users = {
  registerSeller: async (
    id,
    UserFirstName,
    UserLastName,
    UserCity,
    UserCountry,
    UserAvatar,
    Role
  ) => {
    const sql_register_seller =
      "UPDATE users SET UserFirstName = ?, UserLastName = ?, UserCity = ?, UserCountry = ?, UserAvatar = ?, Role = ? WHERE UserID = ?";
    try {
      const result = await db.query(sql_register_seller, [
        UserFirstName,
        UserLastName,
        UserCity,
        UserCountry,
        UserAvatar,
        Role,
        id,
      ]);
      return result;
    } catch (error) {
      console.log("Error executing query:", error);
      throw error;
    }
  },
  getAllUsers: async (userID) => {
    let sql_getUsers = "SELECT * FROM users ";
    try {
      if (userID) {
        sql_getUsers += "WHERE userID IS NULL OR userID !=  ? AND deleted = 0";
      } else {
        sql_getUsers += "WHERE deleted = 0";
      }
      const result = await query(sql_getUsers, [userID]);

      return result;
    } catch (error) {
      console.log("Error executing query:", error);
      throw error;
    }
  },
};

module.exports = Users;
