const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);
var md5 = require("md5");

const Auth = {
  //checking username existence
  checkUsernameExists: async (username) => {
    const sql_check_username =
      "SELECT COUNT(*) AS count FROM users WHERE UserName = ?";
    try {
      const [rows] = await query(sql_check_username, [username]);
      console.log("[rows]", rows.count);
      return rows.count > 0;
    } catch (error) {
      console.log("Error checking username existence:", error);
      throw error;
    }
  },

  //   checking email existence
  checkUseremailExists: async (useremail) => {
    const sql_check_useremail =
      "SELECT COUNT(*) AS count FROM users WHERE UserEmail = ?";
    try {
      const [rows] = await query(sql_check_useremail, [useremail]);
      console.log("[rows]", rows.count);
      return rows.count > 0;
    } catch (error) {
      console.log("Error checking username existence:", error);
      throw error;
    }
  },
  authRegister: async (
    UserID,
    UserEmail,
    UserName,
    UserPassword,
    UserFirstName,
    UserLastName,
    UserCity,
    UserCountry,
    Gender,
    Birthday,
    Role,
    authToken
  ) => {
    const sql_register =
      "INSERT INTO users (UserID, UserEmail,UserName,UserPassword,UserFirstName,UserLastName,UserCity,UserCountry,Gender,Birthday,Role,authToken) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
    try {
      const result = await query(sql_register, [
        UserID,
        UserEmail,
        UserName,
        md5(UserPassword),
        UserFirstName,
        UserLastName,
        UserCity,
        UserCountry,
        Gender,
        Birthday,
        Role,
        authToken,
      ]);
      return result;
    } catch (error) {
      console.log("Lỗi khi thực hiện truy vấn:", error);
      throw error;
    }
  },
};

module.exports = Auth;
