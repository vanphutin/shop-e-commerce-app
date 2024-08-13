const User = require("../model/user.model");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports.registerSeller = async (req, res) => {
  try {
    const { id, UserFirstName, UserLastName, UserCity, UserCountry } = req.body;
    let { UserAvatar } = req.body;
    const Role = "seller";

    // If a file is uploaded
    if (req.file) {
      const avatarPath = req.file.path;
      const avatarData = fs.readFileSync(avatarPath);
      UserAvatar = avatarData.toString("base64"); // Convert to base64 string
    }

    if (
      !id ||
      !UserFirstName ||
      !UserLastName ||
      !UserCity ||
      !UserCountry ||
      !UserAvatar
    ) {
      return res.status(400).json({
        code: 400,
        message: "Missing required fields",
      });
    }

    const userSeller = await User.registerSeller(
      id,
      UserFirstName,
      UserLastName,
      UserCity,
      UserCountry,
      UserAvatar,
      Role
    );

    if (!userSeller) {
      return res.status(400).json({
        code: 400,
        message: "Error updating user",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Update user seller successful",
    });
  } catch (error) {
    console.log("Error executing query:", error);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

module.exports.createProducts = async (req, res) => {
  const ProductID = uuidv4();
  try {
    const {
      ProductName,
      ProductPrice,
      ProductWeight,
      ProductLongDesc,
      ProductImage,
      ProductCategoryID,
      ProductStock,
      UserID,
    } = req.body;
  } catch (error) {
    console.log("Error executing query:", error);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  const { userID } = req.query;

  try {
    const getUser = await User.getAllUsers(userID);
    if (getUser.length <= 0) {
      return res.status(400).json({
        code: 404,
        message: "Don't find user !",
      });
    }

    // Tạo dữ liệu người dùng
    const users = getUser.map((user) => ({
      id: user.userID,
      avatar: user.UserAvatar,
      username: user.UserName,
      city: user.UserCity,
      country: user.UserCountry,
      lastname: user.UserLastName,
      firstname: user.UserFirstName,
      email: user.UserEmail,
      gender: user.Gender,
      role: user.role,
      birthday: user.birthday,
    }));

    res.status(200).json({
      code: 200,
      message: "Users retrieved successfully",
      data: users, // Trả về danh sách người dùng
    });
  } catch (error) {
    console.log("Error executing query:", error);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
