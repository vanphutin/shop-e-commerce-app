const User = require("../model/user.model");
const fs = require("fs");

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
