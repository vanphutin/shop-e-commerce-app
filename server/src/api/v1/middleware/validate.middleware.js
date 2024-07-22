const Auth = require("../model/auth.model");
const validateRegister = async (req, res, next) => {
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
  if (
    !UserEmail ||
    !UserName ||
    !UserPassword ||
    !UserFirstName ||
    !UserLastName ||
    !UserCity ||
    !UserCountry ||
    !Gender ||
    !Birthday
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  //checking username existence
  const usernameExists = await Auth.checkUsernameExists(UserName);
  if (usernameExists) {
    return res.status(400).json({ error: "Username already exists" });
  }
  //   checking email existence
  const useremailExists = await Auth.checkUseremailExists(UserEmail);
  if (useremailExists) {
    return res.status(400).json({ error: "UserEmail already exists" });
  }
  //validate email
  var emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (UserEmail.length > 254) {
    return res.status(400).json({ error: "Invalid email" });
  }
  var validemail = emailRegex.test(UserEmail);
  if (!validemail) return res.status(400).json({ error: "Invalid email" });

  //validate username
  var nameRegex = /^[a-zA-Z\-]+$/;
  var valideusername = nameRegex.test(UserName);
  if (!valideusername)
    return res.status(400).json({ error: "Invalid username" });

  // Đặt giá trị mặc định cho Role nếu không được cung cấp
  if (!Role || Role.trim() === "") {
    req.body.Role = "user";
  }
  next();
};

const validateLogin = async (req, res, next) => {
  const { UserEmail, UserPassword } = req.body;
  if (!UserEmail || !UserPassword === "") {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const check_email_pass = await Auth.authCheckEmailPass(
    UserEmail,
    UserPassword
  );
  // console.log("check_email_pass", check_email_pass);
  if (check_email_pass) {
    return res.status(400).json({ error: "UserEmail already exists" });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
