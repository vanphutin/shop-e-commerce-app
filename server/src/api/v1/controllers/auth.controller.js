const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Auth = require("../../v1/model/auth.model");
const db = require("../../../config/database.config");
// const { promisify } = require("util");
// const query = promisify(db.query).bind(db);

module.exports.authRegister = async (req, res) => {
  const UserID = uuidv4();
  try {
    const {
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
    } = req.body;

    const secretKey = "vanphutin-2004-29-02";
    const authToken = jwt.sign({ UserID, UserEmail, UserPassword }, secretKey, {
      expiresIn: "1h",
    });

    const register = await Auth.authRegister(
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
    );

    res.status(201).json({
      code: 201,
      message: "User registration successful",
      authToken,
    });
  } catch (error) {
    console.error("Error processing registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.authLogin = async (req, res) => {
  try {
    const { UserEmail, UserPassword } = req.body;
    // console.log("req.body", req.body);
    const loginAuth = await Auth.authLogin(UserEmail, UserPassword);
    if (!loginAuth) {
      return res.status(400).json({
        code: 400,
        message: "Email or Password is not valid",
      });
    }
    const secretKey = "vanphutin-2004-29-02";
    const authToken = jwt.sign(
      {
        UserEmail: loginAuth.UserEmail,
        UserPassword: loginAuth.UserPassword,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", authToken, { httpOnly: true });
    await db.query("UPDATE users SET authToken = ? WHERE UserID = ?", [
      authToken,
      loginAuth.UserID,
    ]);
    res.status(200).json({
      code: 200,
      message: "Login successful",

      data: {
        username: loginAuth.UserName,
        lastname: loginAuth.UserLastName,
        firstname: loginAuth.UserFirstName,
        useremail: loginAuth.UserEmail,
        address: {
          city: loginAuth.UserCity,
          country: loginAuth.UserCountry,
        },
        gender: loginAuth.Gender,
        birthday: loginAuth.Birthday,
        role: loginAuth.Role,
        delete: loginAuth.Deleted,
        createAt: loginAuth.createAt,
      },
      token: loginAuth.authToken,
    });
  } catch (error) {
    console.error("Error processing registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
