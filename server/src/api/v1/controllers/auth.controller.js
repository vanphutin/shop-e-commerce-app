const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Auth = require("../../v1/model/auth.model");

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
