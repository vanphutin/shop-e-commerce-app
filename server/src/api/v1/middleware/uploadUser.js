const multer = require("multer");
const path = require("path");

// Sử dụng memory storage thay vì disk storage
const storage = multer.memoryStorage();

const uploadUser = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("UserAvatar");

// Kiểm tra loại file
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|webp|png|gif/;
  const extname = filetypes.test(file.originalname.toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
module.exports = uploadUser;
