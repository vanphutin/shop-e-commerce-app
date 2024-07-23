const db = require("../../../config/database.config");

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
};

module.exports = Users;
